"use strict";!function(){const e=window.matchMedia("(prefers-color-scheme: dark)");e&&(e.onchange=function(e){browserApi.runtime.sendMessage({action:ACTIONS.RefreshDarkMode,payload:{value:e.matches}})}),browserApi.runtime.onMessage.addListener((({action:e,payload:n},o,t)=>{if(e===ACTIONS.GetContent)return prepareContent().then((e=>{t({type:e.type,doc:e.content||"",uploadContentObjUrl:e.uploadContentObjUrl,pageInfo:getPageInfo()})})),!0;if(e===ACTIONS.Ping)t({pong:!0});else if(e===ACTIONS.ShowMessage)showMessage(n);else if(e===ACTIONS.GetPageInfo){const e=getPageInfo();t(e)}else e===ACTIONS.AddIframeContent||console.warn("Unknown message has been taken")}))}();