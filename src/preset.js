// クラス
class PRESETJS{
    constructor(){
    }

    async HtmlLoad(FileData){
        let IdData = [];
        let PassData = [];

        this._GetPosition();

        // データチェック
        for (let i = 0; i < FileData.length; i++){
            if (typeof FileData[i] == "object" && FileData[0].length == 2){
                ;
            }
            else {
                console.log("%cError: 入力された型が正しくありません.", "color:red");
                return false;
            }
        }

        // id取り出し
        for (let i = 0; i < FileData.length; i++){
            IdData.push(FileData[i][0]);
        }

        // パス取り出し
        for (let i = 0; i < FileData.length; i++){
            PassData.push(FileData[i][1]);
        }

        PassData = this._ChangePass(PassData);

        /*
        addEventListener('DOMContentLoaded', function(){
			document.getElementById("id").innerHTML = "<h1>aaaaaaaaaaaaaaaaaaaaaaaaa</h1>"
		});
        */

        // 出力
        for (let i = 0; i < FileData.length; i++){
            const GetFile = await this._GetFile(PassData[i]);

            // 存在チェック
            if (GetFile == false){
                console.log("%cError: データが取得できませんでした.", "color:red");
                return false;
            }
            else {
                document.getElementById(IdData[i]).innerHTML = GetFile; 
            }            
        }
    }

    async CssLoad(FileData){
        this._GetPosition();
        FileData = this._ChangePass(FileData);

        // 出力
        for (let i = 0; i < FileData.length; i++){
            const LinkElement = document.getElementsByTagName('head')[0];
            let NewLinkElement = document.createElement('link');
            NewLinkElement.rel = "stylesheet";
            NewLinkElement.href = FileData[i];

            LinkElement.appendChild(NewLinkElement);
        }
    }

    async JsLoad(FileData){
        this._GetPosition();
        FileData = this._ChangePass(FileData);

        // 出力
        for (let i = 0; i < FileData.length; i++){
            const ScriptElement = document.getElementsByTagName('body')[0];
            let NewScriptElement = document.createElement('script');
            NewScriptElement.src = FileData[i];

            ScriptElement.appendChild(NewScriptElement);
        }
    }

    _GetPosition(){
        
        // 設定ファイルの位置を取得して起点階層を設定
        const Scripts = document.getElementsByTagName("script");
        const ConfigPosition = Scripts[Scripts.length - 1].src
        this.BasePosition = ConfigPosition.slice(0, ConfigPosition.lastIndexOf("/") + 1);

        console.log(this.BasePosition);
    }

    _ChangePass(ChangeData){

        // すべてString型か確認
        for (let i = 0; i < ChangeData.length; i++){
            if (typeof ChangeData[i] == "string"){
                ;
            }
            else {
                console.log("%cError: 入力された型が正しくありません.", "color:red");
                return false;
            }
        }

        // 絶対パスに変換
        for (let i = 0; i < ChangeData.length; i++){
            if (ChangeData[i].match(/^(\/|http:|https:|\/\/).+/)){
                // 絶対パス or 外部サイト
                ;
            }
            else if (ChangeData[i].match(/^(\.\/|\.\.\/).+/)){
                // 相対パス
                let PositionTemp = this.BasePosition;

                while (true){
                    if (ChangeData[i].match(/^\.\//)){
                        // 現状維持
                        ChangeData[i] = ChangeData[i].replace("./", "");
                    }
                    else if (ChangeData[i].match(/^\.\.\//)){
                        // 階層戻ル
                        PositionTemp = PositionTemp.slice(0, -1);
                        PositionTemp = PositionTemp.slice(0, PositionTemp.lastIndexOf("/") + 1);
                        ChangeData[i] = ChangeData[i].replace("../", "");

                        // 上層無シ
                        if (PositionTemp == PositionTemp.match(/^.+:(\/|\/\/|\/\/\/)[^\/]*/)[0]){
                            console.log("%cError: 指定されたファイル位置が異常です.", "color:red");
                            return false;
                        }
                        else {
                            ;
                        }
                    }
                    else if (ChangeData[i].match(/^[^/]+\//)){
                        // 階層追加
                        PositionTemp = PositionTemp + ChangeData[i].match(/^[^/]+\//);
                        ChangeData[i] = ChangeData[i].replace(/^[^/]+\//, "");
                    }
                    else if (ChangeData[i].match(/^.+/)){
                        // ファイル位置
                        PositionTemp = PositionTemp + ChangeData[i];
                        ChangeData[i] = "";
                    }
                    else {
                        break;
                    }
                }

                ChangeData[i] = PositionTemp + ChangeData[i];
            }
            else {
                // 異常値
                console.log("%cError: 入力された値が正しくありません.", "color:red");
                return false;
            }
        }
        return ChangeData;
    }

    async _GetFile(FileLink){
        const GetFileData = await fetch(FileLink);
        
        if (GetFileData.ok){
            return GetFileData.text();
        }
        else {
            console.log("%cError: データが取得できませんでした.", "color:red");
            return false;
        }

        /*
        fetch(FileLink)
            .then((response) => {
                if (response.ok){
                    return response.text()
                }
                else {
                    return false;
                }
            })
            .then ((data) => {
                return data
                // ここからの返し方がわからん
            })
        */
    }
}

// インスタンス化
const PresetJs = new PRESETJS;

// Copyright: https://github.com/Meziro039