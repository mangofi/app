export const generateAddressUrl = (address) => `https://${process.env.NEXT_PUBLIC_APP_ENV !== 'production' ? 'testnet.' : ''}bscscan.com/address/${address}`;

export default null;
