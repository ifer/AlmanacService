/**
 * @todo: recursively send requests until all contacts are fetched
 *
 * @see https://developers.google.com/google-apps/contacts/v3/reference#ContactsFeed
 *
 * To API test requests:
 *
 * @see https://developers.google.com/oauthplayground/
 *
 * To format JSON nicely:
 *
 * @see http://jsonviewer.stack.hu/
 *
 * Note: The Contacts API has a hard limit to the number of results it can return at a
 * time even if you explicitly request all possible results. If the requested feed has
 * more fields than can be returned in a single response, the API truncates the feed and adds
 * a "Next" link that allows you to request the rest of the response.
 */
var EventEmitter = require('events').EventEmitter,
    _ = require('lodash'),
    qs = require('querystring'),
    util = require('util'),
    url = require('url'),
    https = require('https'),
    debug = require('debug')('google-contacts');

var GoogleContacts = function (params) {
    if (typeof params === 'string') {
        params = { token: params };
    }
    if (!params) {
        params = {};
    }

    this.contacts = [];
    this.consumerKey = params.consumerKey ? params.consumerKey : null;
    this.consumerSecret = params.consumerSecret ? params.consumerSecret : null;
    this.token = params.token ? params.token : null;
    this.refreshToken = params.refreshToken ? params.refreshToken : null;

    this.params = _.defaults(params, { thin: true });
};

GoogleContacts.prototype = {};

util.inherits(GoogleContacts, EventEmitter);

GoogleContacts.prototype._get = function (params, cb) {
    if (typeof params === 'function') {
        cb = params;
        params = {};
    }

    var req = {
        host: 'www.google.com',
        port: 443,
        path: this._buildPath(params),
        method: 'GET',
        headers: {
            Authorization: 'OAuth ' + this.token,
            'GData-Version': 3,
        },
    };

    debug(req);

    https
        .request(req, function (res) {
            var data = '';

            res.on('data', function (chunk) {
                debug('got ' + chunk.length + ' bytes');
                // let s = chunk.toString('utf-8');
                // if (s.indexOf('\uFFFD') >= 0) {
                //     // console.log(chunk);
                //     // console.log('Special character: ' + s);
                //     s = s.replace(/\uFFFD/, ' ');
                // }
                // data += s;
                data += chunk.toString('utf-8');
            });

            res.on('error', function (err) {
                cb(err);
            });

            res.on('end', function () {
                if (res.statusCode < 200 || res.statusCode >= 300) {
                    var error = new Error('Bad client request status: ' + res.statusCode);
                    return cb(error);
                }
                try {
                    debug(data);
                    cb(null, JSON.parse(data));
                } catch (err) {
                    cb(err);
                }
            });
        })
        .on('error', cb)
        .end();
};

GoogleContacts.prototype.getContacts = function (cb, params) {
    var self = this;

    this._get(_.extend({ type: 'contacts' }, params, this.params), receivedContacts);
    function receivedContacts(err, data) {
        if (err) return cb(err);

        var feed = _.get(data, 'feed', []);
        var entry = _.get(data, 'feed.entry', []);
        if (!entry.length) {
            return cb(null, entry);
        }

        self._saveContactsFromFeed(feed);

        var next = false;
        _.each(feed.link, function (link) {
            if (link.rel === 'next') {
                next = true;
                var path = url.parse(link.href).path;
                self._get({ path: path }, receivedContacts);
            }
        });
        if (!next) {
            cb(null, self.contacts);
        }
    }
};

GoogleContacts.prototype.getContact = function (cb, params) {
    var self = this;

    if (!_.has(params, 'id')) {
        return cb('No id found in params');
    }

    this._get(_.extend({ type: 'contacts' }, this.params, params), receivedContact);

    function receivedContact(err, contact) {
        if (err) return cb(err);

        cb(null, contact);
    }
};

GoogleContacts.prototype._saveContactsFromFeed = function (feed) {
    var self = this;
    // console.log(JSON.stringify(feed));

    _.each(feed.entry, function (entry) {
        // The 'ingroup' filter exclude 'other contacts' (added automatically by Google)
        ingroup = _.get(entry, 'gContact$groupMembershipInfo');
        if (ingroup) {
            var el, url;
            if (self.params.thin) {
                url = _.get(entry, 'id.$t', '');
                // console.log(`${_.get(entry, 'title.$t')} :  ${JSON.stringify(_.get(entry, 'gd$email'))}`);
                // console.log(_.get(entry, 'title.$t') + ' ' + _.get(entry, 'gd$name.gd$fullName.$t'));

                // Select the primary phone, if exists
                const phones = _.get(entry, 'gd$phoneNumber', '');
                let primaryPhone;
                if (phones.length === 1) {
                    primaryPhone = phones[0].$t;
                } else {
                    for (let i = 0; i < phones.length; i++) {
                        // console.log(JSON.stringify(phones[i]));
                        if (phones[i].primary && phones[i].$t) {
                            primaryPhone = phones[i].$t;
                        }
                    }
                }
                if (!primaryPhone && phones.length > 0) {
                    // console.log(JSON.stringify(phones));
                    primaryPhone = phones[0].$t;
                }

                el = {
                    name: _.get(entry, 'title.$t'),
                    fullName: _.get(entry, 'gd$name.gd$fullName.$t'),
                    givenName: _.get(entry, 'gd$name.gd$givenName.$t') || '',
                    familyName: _.get(entry, 'gd$name.gd$familyName.$t') || '',
                    email: _.get(entry, 'gd$email.0.address'), // only save first email
                    emails: getEmailAddresses(entry),
                    phoneNumber: primaryPhone,
                    // phoneNumber: _.get(entry, 'gd$phoneNumber.0.uri', '').replace('tel:', ''),
                    id: url.substring(_.lastIndexOf(url, '/') + 1),
                };
                el.givenName = fixSpecialCharacter(el.givenName, el.fullName, 'givenName');
                el.familyName = fixSpecialCharacter(el.familyName, el.fullName, 'familyName');

                // console.log(el.familyName + ' ' + el.givenName);
                // if (parseInt(el.id, 10) % 3 == 0) {
                // console.log(el.fullName + ' primaryPhone=' + primaryPhone);
                // }
            } else {
                el = entry;
            }
            self.contacts.push(el);
        }
    });
};

// Workaround to try to fix unicode special characters received for some reason
function fixSpecialCharacter(name, fullName, type) {
    if (name.indexOf('\uFFFD') < 0) {
        return name;
    }

    const s = fullName.split(' ');
    if (s.length != 2) {
        return name;
    }
    if (type === 'givenName') {
        // console.log('Replacing  ' + name + ' with ' + s[0]);
        return s[0];
    } else {
        // console.log('Replacing  ' + name + ' with ' + s[1]);
        return s[1];
    }
}

// _.get(entry, 'gd$email').map(function (email) {
//     return email.address;
// }),

function getEmailAddresses(entry) {
    let emails = _.get(entry, 'gd$email');
    if (emails) {
        return emails.map(function (email) {
            return email.address;
        });
    } else {
        return [];
    }
}

GoogleContacts.prototype._buildPath = function (params) {
    if (params.path) return params.path;

    params = _.extend({}, params, this.params);
    params.type = params.type || 'contacts';
    params.alt = params.alt || 'json';
    params.projection = params.projection || (params.thin ? 'thin' : 'full');
    params.email = params.email || 'default';
    params['max-results'] = params['max-results'] || 10000;

    var query = {
        alt: params.alt,
    };

    if (!params.id) query['max-results'] = params['max-results'];

    if (params['updated-min']) query['updated-min'] = params['updated-min'];

    if (params.q || params.query) query.q = params.q || params.query;

    var path = '/m8/feeds/';
    path += params.type + '/';
    path += params.email + '/';
    path += params.projection;
    if (params.id) path += '/' + params.id;
    path += '?' + qs.stringify(query);
    console.log(`path=${path}`);
    return path;
};

GoogleContacts.prototype.refreshAccessToken = function (refreshToken, params, cb) {
    if (typeof params === 'function') {
        cb = params;
        params = {};
    }

    var data = {
        refresh_token: refreshToken,
        client_id: this.consumerKey,
        client_secret: this.consumerSecret,
        grant_type: 'refresh_token',
    };

    var body = qs.stringify(data);

    var opts = {
        host: 'accounts.google.com',
        port: 443,
        path: '/o/oauth2/token',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': body.length,
        },
    };

    var req = https
        .request(opts, function (res) {
            var data = '';
            res.on('end', function () {
                if (res.statusCode < 200 || res.statusCode >= 300) {
                    var error = new Error('Bad client request status: ' + res.statusCode);
                    return cb(error);
                }
                try {
                    data = JSON.parse(data);
                    cb(null, data.access_token);
                } catch (err) {
                    cb(err);
                }
            });

            res.on('data', function (chunk) {
                data += chunk;
            });

            res.on('error', cb);
        })
        .on('error', cb);

    req.write(body);
    req.end();
};

exports.GoogleContacts = GoogleContacts;
