export function getAuthority(str?: string): string | string[] {
    const a = `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyTmFtZSI6ImxpdXl1bnNoZW5nc2lyIiwiZXhwIjoxNjg1NjEwNTAwLCJ1c2VySWQiOiIxMTExMTExIn0.IEdyXM2yLei6vrK0pCOF51MRoYENlF_xhcjGBpdjNhc`;
    localStorage.setItem('antd-pro-authority', JSON.stringify(a));

    const authorityString =
        typeof str === 'undefined' && localStorage ? localStorage.getItem('antd-pro-authority') : str;
    // authorityString could be admin, "admin", ["admin"]
    let authority;
    try {
        if (authorityString) {
            authority = JSON.parse(authorityString);
        }
    } catch (e) {
        authority = authorityString;
    }
    if (typeof authority === 'string') {
        return [authority];
    }
    // if (!authority ) {
    //   return ['admin'];
    // }
    debugger;
    return authority;
}

export function setAuthority(authority: string | string[]): void {
    const proAuthority = typeof authority === 'string' ? [authority] : authority;
    localStorage.setItem('antd-pro-authority', JSON.stringify(proAuthority));
    // auto reload

}