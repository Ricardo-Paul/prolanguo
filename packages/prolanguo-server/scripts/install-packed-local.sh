echo "installing packed local packages"

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"; #dir of executing script
PROLANGUO_SERVER_DIR="${SCRIPT_DIR}/..";

cd ${PROLANGUO_SERVER_DIR/local-packages}

npm install --no-save --only=production \
    $( find . -type f -name "prolanguo-prolanguo-common-*.tgz" -print -quit ) \
    $( find . -type f -name "prolanguo-prolanguo-remote-db-*.tgz" -print -quit ) \
    $( find . -type f -name "prolanguo-prolanguo-resolver-*.tgz" -print -quit ) 

echo "Local packages installed !"