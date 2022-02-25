#!/bin/bash
echo "pack-local running ..."

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )" #dir of executing script
PROLANGUO_SERVER_DIR="${SCRIPT_DIR}/.." #build string dir to move up to prolanguo-server

echo SCRIPTS_DIR: ${SCRIPT_DIR}
echo PROLANGUO_SERVER_DIR: ${PROLANGUO_SERVER_DIR}

cd ${PROLANGUO_SERVER_DIR} #cd into prolanguo-server
/bin/rm -Rf local-packages # make to remove folder first
mkdir local-packages

cd local-packages

echo "about to pack local packages ..."

npm pack ${PROLANGUO_SERVER_DIR}/../prolanguo-common
npm pack ${PROLANGUO_SERVER_DIR}/../prolanguo-remote-db
npm pack ${PROLANGUO_SERVER_DIR}/../prolanguo-resolver

echo "packing local packages done!"