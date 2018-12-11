#!/usr/bin/env bash
set -euxo pipefail

# Setup environment
NAME=string-o-matic
ZIP=${NAME}.zip
BUILD=../build
FROM=`pwd`
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Move to script directory
cd ${DIR}

# Clean up any previous build
rm -rf ${ZIP}
rm -rf ${BUILD}
rm -rf ${NAME}

# Run npm build
cd ..
npm run build
cd ${DIR}

# Move, rename and zip build directory
mv ${BUILD} ${NAME}
zip -r ${ZIP} ${NAME}

# Upload
scp ${ZIP} ${LINODE2}:/tmp
scp vhost.conf ${LINODE2}:/tmp

# Cleanup
rm -rf ${ZIP}
rm -rf ${BUILD}
rm -rf ${NAME}

# Go back to where we started
cd ${FROM}
