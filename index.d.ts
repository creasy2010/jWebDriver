/**
 * @desc
 * 示例api请参考
 * https://github.com/yaniswang/jWebDriver#you-can-search-all-api-here-include-all-mode-of-api
 *
 * @使用场景
 *
 * @coder.yang2010@gmail.com
 * @Date    2021/3/17
 **/


declare module '@yzf/jwebdriver' {
    export default class JWebDriver {

        static chaiSupportChainPromise:boolean;


        // ========================== driver api start ==========================

        /**
         * connect to http://127.0.0.1:4444
         */
        constructor( );

        constructor( host: string, port:  string|number);


        constructor(param:{
            host: string;
            port:  string|number;
            logLevel?:  0|1|2;//// 0: no log, 1: warning & error, 2: all log
            nocolor?:boolean;
            speed?:number; // default: 0 ms
        });

        info(sessionConfig:any):any ;

        // ========================== session api ==========================
        /**
         * get all sessions
         */
        sessions():JBrowser[] ;

        // session(sessionConfig:any):JWebDriver ;
        /**
         * new session
         * @param sessionConfig
         */
        session(sessionConfig:{
            browserName:string;
            version?:string;
            platform?:string;

            hosts?:string;//'192.168.1.1 www.alibaba.com\r\n192.168.1.1 www.google.com
            proxy?: {
                proxyType: 'manual'|"pac";
                httpProxy?:string;//'192.168.1.1:1080',
                sslProxy?:string;//'192.168.1.1:1080'
                proxyAutoconfigUrl?: string;//http://x.x.x.x/test.pac
            }
        }):JBrowser ;

        /**
         * new session
         * @param browserName
         * @param version
         * @param platform
         */
        session(browserName:string,
            version:string,
            platform:string
        ):JBrowser ;

        /**
         * attach session
         * @param sessionId
         */
        session(sessionId:string):JBrowser ;

        /**
         * attach session
         * @param sessionConfig
         */
        session(sessionConfig:{
            sessionId:string;
        }):JBrowser ;


        /**
         * 获取大小
         */
        size():{width: number, height: number};

        /**
         * 设置窗口大小
         * @param width
         * @param height
         */
        size(width:number, height:number):{width: number, height: number};

        windowSize(width:number,height:number):JWebDriver;

        config(config:any):JWebDriver;

        url(url?:string) : Promise<string>;

        source() : Promise<string>;

        refresh() : Promise<void>;

        back() : Promise<void>;

        forward() : Promise<void>;

        cookies() : Promise<JCookies>;

        close() : Promise<void>;

        switchFrame(ele?:JElement|null) : JWebDriver&Promise<JWebDriver>;

        sleep(timeIsMs:number) : JWebDriver & Promise<JWebDriver>;

        eval<T=any>(body:FunctionBody,arguments?:any[]) : Promise<T>;
        // eval(body:FunctionBody,arguments:any[]) : JWebDriver | Promise<void>;

        //这几个应该是element对象上的方法
        click(btn?:MouseButtons) :  JWebDriver & Promise<void>;
        mouseMove(x:number,y:number) : JWebDriver & Promise<void>;
        html() : JWebDriver & Promise<string>;
        sendKeys(keys:string) : Promise<void>;

        [name:string]:any;
    }

    // function readFileSync(path: string | number, options?: { encoding?: string; flag?: string; } | null): JWebDriver;

    export type TimeInMs =number;

    export interface JElementQueryResult extends JElement{
        get(index:number):Promise<JElement>;
        first():Promise<JElement>;
        last():Promise<JElement>;
        slice(start:number,end:number):Promise<JElementQueryResult>;
    }

    // TODO dong 2021/7/11 这个怎么做到 ？elements filter for chain promise

    export interface JElement {
        find(cssSelector:string):Promise<JElement>
        equal(cssSelector:string):Promise<Boolean>
        sleep(timeInMs:number):Promise<JElement>&JElement;
        text():Promise<string>;
        click(btn?:MouseButtons) :  JElement & Promise<JElement>;
        mouseMove(x:number,y:number) : JElement & Promise<JElement>;
        html() : JWebDriver & Promise<string>;
        sendKeys(keys:string) : Promise<void>;

        tagName():Promise<string>;
        html():Promise<string>;
        val(attr?:string):Promise<string>;
        attr(attrName?:string):Promise<string>;
        prop(attrName?:string):Promise<string>;
        css(cssName?:string):Promise<string>;
        clear():Promise<void>;
        offset(isOff?:boolean):Promise<any>; // TODO dong 2021/7/11
        size():Promise<any>; // TODO dong 2021/7/11
        displayed():Promise<boolean>; // TODO dong 2021/7/11
        enabled():Promise<boolean>;
        selected():Promise<boolean>;
        rect():Promise<any>;// TODO dong 2021/7/11 这里要验证

        // select option
        select(optionIndex:number):Promise<void>;
        select(valueStr:string):Promise<void>;
        select(param:{
            type: 'value'|"index"|"text", // index | value | text
            value: 'book';
        }):Promise<void>;


        sendKeys(keys:string):Promise<void>;
        click():Promise<void>;
        dblClick():Promise<void>;
        dragDropTo(targetSelector:string,x?:number,y?:number):Promise<void>;
        dragDropTo(param:{
            selector:string;
            x?:number;
            y?:number;
        }):Promise<void>;

        uploadFile(filePath:string):Promise<void>;
        submit(filePath:string):Promise<void>;



        // ========================== mobile api ==========================
        touchClick():Promise<void>;
        touchDblClick():Promise<void>;
        touchLongClick():Promise<void>;
        touchScroll(x:number,y:number):Promise<void>;
        touchScroll(param:{x:number,y:number}):Promise<void>;
        touchFlick(x:number,y:number,speed:number):Promise<void>;
        touchScroll(param:{x:number,y:number,speed:number}):Promise<void>;

    }
    /**
     sync eval
         var title = yield browser.eval(function(){
            return document.title;
        });
         var value = yield browser.eval(function(arg1, arg2){
            return arg1;
        }, 1, 2);
         var value = yield browser.eval(function(arg1, arg2){
            return arg1;
        }, [1, 2]);

   async eval
         var value = yield browser.eval(function(arg1, arg2, done){
            setTimeout(function(){
                done(arg2);
            }, 2000);
        }, 1, 2);
         // pass element to eval
         var tagName = yield browser.eval(function(elements){
            return elements[0].tagName;
        }, yield browser.find('#id'));
     */
    export type FunctionBody =string | Function;
    export enum MouseButtons {
        LEFT= 0,
        MIDDLE= 1,
        RIGHT= 2
    }

    export interface JBrowser {

        info():void;//// get capabilities
        support(supportYype:"javascript"|"cssselector"| "screenshot"| "storage"|'alert'| "database"|"rotatable"):boolean;// // get capability supported: javascript, cssselector, screenshot, storage, alert, database, rotatable
        config(configParam:{
                   pageloadTimeout?: number; // page onload timeout
                   scriptTimeout?: number;// sync script timeout
                   asyncScriptTimeout?:  number; // async script timeout
                   implicitTimeout?:  number; // implicit timeout
               }):Promise<JBrowser>;
        sleep(milliseconds:number):Promise<void>&JBrowser;
        logTypes(milliseconds:number):Promise<any[]>&JBrowser;
        logs(logtype:string):Promise<any[]>&JBrowser;

        eval<T=any>(body:FunctionBody,arguments?:any[]) : JBrowser & Promise<T>;

        windowSize(width:number,height:number):JBrowser;
        /**
         * get current window handle
         */
        windowHandle():JWindow;

        /**
         *  get all windows
         */
        windowHandles():JWindow[];

        /**
         *
         * @param url       http://www.alibaba.com/
         * @param title     testwindow
         * @param config    'width=200,height=200'
         */
        newWindow(url:string,title:string,config:string);

        /**
         * get all frames
         */
        frames():JFrame[];

        /**
         *
         var elements = yield browser.frames(); // get all frames
         yield browser.switchFrame(0); // focus to frame 0
         yield browser.switchFrame(1); // focus to frame 1
         yield browser.switchFrame('#iframe_id'); // focus to frame #iframe_id
         yield browser.switchFrame(null); // focus to main page
         yield browser.switchFrameParent(); // focus to parent context
         * @param indexOrFrameId
         */
        switchFrame(indexOrFrameId:string|number|null):void;

        /**
         *set position
         */
        position():Promise<{x:number,y:number}>

        /**
         * set position
         * @param x
         * @param y
         */
        position(x:number,y:number):Promise<void>

        size():Promise<{x:number;y:number}>;

        /**
         *set position
         */
        size():Promise<{width:number,height:number}>

        /**
         * set position
         * @param x
         * @param y
         */
        size(width:number,height:number):Promise<void>

        /**
         * maximize
         */
        maximize():Promise<void>;

        /**
         *
         * @param positionParam
         */
        position(positionParam:{
                     x:number;
                     y:number
                 }):Promise<void>
        /**
         * focus to parent context
         */
        switchFrameParent():void;


        /**
         * close current window
         */
        closeWindow():void;

        /**
         * focus to window
         * @param windowNameOrIndex
         */
        switchWindow(sessionIdOrIndex:string|number):JBrowser;
        close():Promise<void>;


        getScreenshot(savePath?:string|{elem:string,filename?:string}) : Promise<string>;



        // ========================== url & title & source ==========================
        url():Promise<string>;
        url(toUrl:string):Promise<string>;
        title():Promise<string>;
        source():Promise<string>;
        html():Promise<string>;

        // ========================== navigator ==========================
        refresh():Promise<void>&JBrowser;
        back():Promise<void>&JBrowser;
        forward():Promise<void>&JBrowser;
        scrollTo(elemSelector:string,x?:number, y?:number):Promise<void>&JBrowser;
        scrollTo(elemSelector:string,position:{
            x?:number;
            y?:number;
        }):Promise<void>&JBrowser;

        scrollTo(x?:number, y?:number):Promise<void>&JBrowser;

        find(elemSelector:string):Promise<JElement>&JElement;


        // ========================== cookie ==========================

        cookie(cookieName:string):Promise<JCookieValue>&JCookieValue;
        cookie(cookieName:string,cookieValue:JCookieValue,config: {// https://code.google.com/p/selenium/wiki/JsonWireProtocol#Cookie_JSON_Object
            path?: string;
        domain?: string;
        secure?: string;
        httpOnly?: string;
        expiry?: string; //'7 day' // second|minute|hour|day|month|year
    }):Promise<void>&JElement;

        /**
         *  delete cookie
         * @param cookieName
         */
        removeCookie(cookieName:string):Promise<void>;

        /**
         * get all cookie
         * @param cookieName
         */
        cookies():Promise<JCookies>;

        clearCookies():Promise<void>;



        // ========================== local storage && session storage ==========================

        localStorageKeys():Promise<string[]>;

        localStorage(keyName:string):Promise<JLocastageValue>;

        removeLocalStorage(keyName:string):Promise<void>;

        localStorage(keyName:string,value:JLocastageValue):Promise<void>;

        clearLocalStorages():Promise<void>;


        sessionStorageKeys():Promise<string[]>;

        sessionStorage(keyName:string):Promise<JSesstionValue[]>;

        sessionStorage(keyName:string,value:JSesstionValue):Promise<void>;

        removeSessionStorage(keyName:string):Promise<void>;

        clearSessionStorages():Promise<void>;


        // ========================== alert, confirm, prompt ==========================

        /**
         *  get alert text
         */
        getAlert():Promise<string>;

        /**
         * set msg to prompt
         * @param msg
         */
        setAlert(msg:string):Promise<void>;

        /**
         * accept alert
         */
        acceptAlert():Promise<void>;

        /**
         *  dismiss alert
         */
        dismissAlert():Promise<void>;




        // ========================== mouse ==========================

        MouseButtons:JMouseButtons; // TODO dong 2021/7/11 验证

        mouseMove(x:number,y:number):Promise<void>;
        mouseMove(elemSelector:JElement|string,x:number,y:number):Promise<void>;
        mouseMove(elemSelector:JElement|string,positionParam:{
            x:number;
            y:number;
        }):Promise<void>;

        /**
         * left mouse button down
         */
        mouseDown():Promise<void>;
        mouseDown(button:JMouseButtons|JMouseButtonStr):Promise<void>;
        mouseUp():Promise<void>;
        mouseUp(button:JMouseButtons|JMouseButtonStr):Promise<void>;
        click():Promise<void>;
        click(button:JMouseButtons|JMouseButtonStr):Promise<void>;

        dblClick():Promise<void>;

        dragDrop(obgSelector:string,targetSelector:string,):Promise<void>;
        dragDrop(obgSelector:{
            selector:string;
            x:number;
            y:number;
        },targetSelector:{
            selector:string;
            x:number;
            y:number;
        }):Promise<void>;



        // ========================== keyboard ==========================
        sendKeys(inputKeys:string):Promise<void>;
        Keys:JKeys;
        keyDown():Promise<JKeysStr|JKeys>;
        keyUp():Promise<JKeysStr|JKeys>;


        // ========================== eval ==========================
        eval<T=any>(body:FunctionBody,arguments?:any[]) : JBrowser & Promise<T>;

        // eval(body:FunctionBody,arguments:any[]) : JWebDriver | Promise<void>;

        // ========================== element ==========================

        wait(selectorOrXpath:string,time?:TimeInMs) : Promise<JElement>&JElement;
        wait(selectorOrXpath:string,config?: {
            timeout: number, // set timeout, default: 10000
            displayed: boolean, // wait for element displayed, default: true
            removed: boolean // wait for element removed, default: false
        }) : Promise<JElement>&JElement;

        find(selectorOrXpath:string):Promise<JElement>&JElement;
        findVisible(selectorOrXpath:string):Promise<JElement>&JElement;



        // ========================== mobile api ==========================
        touchDown(x:number,y:number):Promise<void>;
        touchDown(param:{
            x:number,y:number
        }):Promise<void>;
        touchMove(x:number,y:number):Promise<void>;
        touchMove(param:{
            x:number,y:number
        }):Promise<void>;
        touchUp(x:number,y:number):Promise<void>;
        touchUp(param:{
            x:number,y:number
        }):Promise<void>;
        touchScroll(x:number,y:number):Promise<void>;
        touchScroll(param:{
            x:number,y:number
        }):Promise<void>;
        touchFlick(param:{
            xspeed: number, // The x speed in pixels per second.
            yspeed: number // The y speed in pixels per second.
        }):Promise<void>;

        orientation():Promise<"LANDSCAPE"|"PORTRAIT">;
        orientation(setOrientation:"LANDSCAPE"|"PORTRAIT"):Promise<void>;


        // ========================== geo location ==========================
        geolocation():Promise<any>;
        geolocation(latitude: number,
                    longitude: number,
                    altitude: number):Promise<void>;



        // ========================== macaca api ==========================
        contexts():Promise<any>;

        /**
         *  get context id
         */
        context():Promise<string>;
        context(contextId:string):Promise<void>;

        /**
         * set context to native
         */
        native():Promise<string>;

        /**
         *  set context to webview
         */
        webview():Promise<string>;

        sendActions(actionType:"tap",param?:{ x: number, y: number}):Promise<void>&JBrowser;
        sendActions(actionType:"doubleTap",param?:{ x: number, y: number}):Promise<void>&JBrowser;
        sendActions(actionType:"press",param?:{ x: number, y: number,duration?:number}):Promise<void>&JBrowser;
        sendActions(actionType:"pinch",param?:{ scale: number, direction: "in"|"",percent:number}):Promise<void>&JBrowser;
        sendActions(actionType:"rotate",param?:{ rotation: number, velocity: number}):Promise<void>&JBrowser;
        sendActions(actionType:"drag",param?:{  fromX: number, fromY: number, toX: number, toY: number}):Promise<void>&JBrowser;
    }

    type JMouseButtonStr="RIGHT";
    type JKeysStr=string;
    enum JKeys{
        CTRL="CTRL",
        LEFT="LEFT",
        RIGHT="RIGHT",

    }
 enum JMouseButtons{
        LEFT,
        RIGHT,

    }

    type JCookieValue=string|number|boolean;
    type JLocastageValue=string|number|boolean;
    type JSesstionValue=string|number|boolean;


    export interface JFrame{

    }
    export interface JElement{
        scrollTo(elemSelector:string,position:{
            x?:number;
            y?:number;
        }):Promise<void>;

        scrollTo(x?:number, y?:number):Promise<void>;
    }
    export interface JWindow{

    }

    export interface JCookies {
        [key:string]:{
            "domain": string;
            "httpOnly": boolean,
            "name": string,
            "path": string,
            "secure": boolean,
            "value":string
        }
    }

}
//
// export interface JWebDriver{
//
// }
