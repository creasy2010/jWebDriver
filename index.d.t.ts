/**
 * @desc
 *
 * @使用场景
 *
 * @coder.yang2010@gmail.com
 * @Date    2021/3/17
 **/

declare module '@yzf/jwebdriver' {
    export default class JWebDriver {
        static chaiSupportChainPromise:boolean;
        url(url?:number) : Promise<string>;
        source() : Promise<string>;
        cookies() : Promise<Object>;
        close() : Promise<void>;
        [name:string]:any;
    }

    // function readFileSync(path: string | number, options?: { encoding?: string; flag?: string; } | null): JWebDriver;


}
//
// export interface JWebDriver{
//
// }
