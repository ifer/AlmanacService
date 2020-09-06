#! /bin/bash

if [ $# -lt 1 ]
then
	echo "Syntax: deploy.sh <linode | plato>" [source]
	exit 1
fi

if [ "$1" = "linode" ]
then
	SERVER="linode"
	COMMAND="tolinode"
elif [ "$1" = "plato" ]
then
	SERVER="plato"
	COMMAND="toplato"
else
	echo "$1: uknown server"
	exit 1
fi

if [ "$2" = "source" ]
then
	LIST="deploy.list.source"
else
	LIST="deploy.list"
fi

version=`cat ./version.txt`;

filename="AlmanacService-$version.tgz"

rm -f AlmanacService*.tgz

echo "Packing files to $filename .."

tar  -zcf $filename -T "$LIST"


if [ $? -ne 0 ]
then
    echo "Error packing $filename (error: $?)"
    exit 1
fi

echo "Sending $filename to $SERVER.."
$COMMAND "$filename"
if [ $? -eq 0 ]
then
    echo "Done"
    rm -f $filename
else
    echo "Error sending $filename to $SERVER"
fi
