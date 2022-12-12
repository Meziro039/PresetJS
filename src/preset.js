class PRESETJS{
    constructor(){
        this.BasePosition = "";
    }

    async HtmlLoad(Input){
        this._SetPosition();

        let IdData = [];
        let PassData = [];

        // データチェック
        for (let i = 0; i < Input.length; i++){
            if (typeof Input[i] == "object" && Input[0].length == 2){
                ;
            }
            else {
                console.log("%cError: 入力された型が正しくありません.", "color:red");
                return false;
            }
        }

        // id取り出し
        for (let i = 0; i < Input.length; i++){
            IdData.push(Input[i][0]);
        }

        // パス取り出し
        for (let i = 0; i < Input.length; i++){
            PassData.push(Input[i][1]);
        }

        // パス変換
        PassData = this._ChangePass(PassData);

        // 出力
        addEventListener('DOMContentLoaded', async () => {
            for (let i = 0; i < Input.length; i++){
                const GetResponse = await fetch(PassData[i])
    
                if (GetResponse.ok){
                    document.getElementById(IdData[i]).innerHTML = await GetResponse.text();
                }
                else {
                    console.error("Error: ファイルを読み込めませんでした. Status: " + String(GetResponse.status));
                }
            }
        });
    }

    CssLoad(Input){
        this._SetPosition();

        let PassData = [];

        // パス変換
        PassData = this._ChangePass(Input);

        // 出力
        addEventListener('DOMContentLoaded', async () => {
            for (let i = 0; i < PassData.length; i++){
                const LinkElement = document.getElementsByTagName('head')[0];
                let NewLinkElement = document.createElement('link');
                NewLinkElement.rel = "stylesheet";
                NewLinkElement.href = PassData[i];

                LinkElement.appendChild(NewLinkElement);
            }
        });
    }

    JsLoad(Input){
        this._SetPosition();

        let PassData = [];

        PassData = this._ChangePass(Input);

        // 出力
        addEventListener('DOMContentLoaded', async () => {
            for (let i = 0; i < PassData.length; i++){
                const ScriptElement = document.getElementsByTagName('body')[0];
                let NewScriptElement = document.createElement('script');
                NewScriptElement.src = PassData[i];

                ScriptElement.appendChild(NewScriptElement);
            }
        });
    }

    _SetPosition(){
        // 設定ファイルの位置を取得して起点位置を設定
        const Scripts = document.getElementsByTagName("script");
        const ConfigPosition = Scripts[Scripts.length - 1].src
        this.BasePosition = ConfigPosition.slice(0, ConfigPosition.lastIndexOf("/") + 1);
    }

    _ChangePass(ChangeData){
        // すべてString型か確認
        for (let i = 0; i < ChangeData.length; i++){
            if (typeof ChangeData[i] == "string"){
                ;
            }
            else {
                console.error("Error: 入力された型が正しくありません.");
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
                            console.error("Error: 指定されたファイル位置が異常です.");
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
                console.error("Error: 入力された値が正しくありません.");
                return false;
            }
        }
        return ChangeData;
    }
}

const PresetJs = new PRESETJS;

// Copyright: https://github.com/Meziro039