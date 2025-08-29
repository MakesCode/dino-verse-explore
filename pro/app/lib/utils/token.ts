export interface JwtPayload {
  roles: 'Agency';
  name: string;
  sub: string;
  sub_id: string;
  nbf: number;
  exp: number;
  token: string;
}
export interface SearchTokenData {
  token: string;
  refreshToken: string;
  utcExpireDate: string;
}
