import MangoTokenContract from 'abis/MangoToken.json';
import SaltTokenContract from 'abis/SaltToken.json';
import MangoTreeContract from 'abis/MangoTree.json';

import SmartContract from './base';

export const MANGO_TOKEN = 'MANGO_TOKEN';

export const SALT_TOKEN = 'SALT_TOKEN';

export const MANGO_TREE = 'MANGO_TREE';

export {
  SmartContract,
};

export default {
  [MANGO_TOKEN]: {
    abi: MangoTokenContract,
  },
  [SALT_TOKEN]: {
    abi: SaltTokenContract,
  },
  [MANGO_TREE]: {
    abi: MangoTreeContract,
  },
};
