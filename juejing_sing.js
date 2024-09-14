
const $ = new Env('掘金签到');
const notify = $.isNode() ? require('./sendNotify') : '';
const fetch = require('node-fetch')
const jwt = require('jsonwebtoken')
//Node.js用户请在jdCookie.js处填写京东ck;
const juejinCookie = [
//     // 我的微信
     `_ga=GA1.2.1996942079.1640658945; _gid=GA1.2.671303286.1640658945; MONITOR_WEB_ID=ec37c61b-a31c-4116-8588-ba5585d7fd8c; passport_csrf_token_default=95eacd51a6f5785a92e15f04a206c83e; passport_csrf_token=95eacd51a6f5785a92e15f04a206c83e; sid_guard=4e6a12203435c5c4757616bcc736ec44%7C1640658956%7C5184000%7CSat%2C+26-Feb-2022+02%3A35%3A56+GMT; uid_tt=14eac5e7a8116a4d65de362bd51a8016; uid_tt_ss=14eac5e7a8116a4d65de362bd51a8016; sid_tt=4e6a12203435c5c4757616bcc736ec44; sessionid=4e6a12203435c5c4757616bcc736ec44; sessionid_ss=4e6a12203435c5c4757616bcc736ec44; sid_ucp_v1=1.0.0-KDA5ODliMDRjY2E3MGQ4ZmE1ZGRiM2Q0OTc1MTNiZDI3OGE1Mzc3NTgKFgiNxdDA_fXpARCM8KmOBhiwFDgIQAsaAmxmIiA0ZTZhMTIyMDM0MzVjNWM0NzU3NjE2YmNjNzM2ZWM0NA; ssid_ucp_v1=1.0.0-KDA5ODliMDRjY2E3MGQ4ZmE1ZGRiM2Q0OTc1MTNiZDI3OGE1Mzc3NTgKFgiNxdDA_fXpARCM8KmOBhiwFDgIQAsaAmxmIiA0ZTZhMTIyMDM0MzVjNWM0NzU3NjE2YmNjNzM2ZWM0NA; n_mh=9-mIeuD4wZnlYrrOvfzG3MuT6aQmCUtmr8FxV8Kl8xY; _gat=1`,
    //      // 自己的
    `_ga=GA1.2.1265664610.1618454563; _tea_utm_cache_2608={%22utm_source%22:%22gold_browser_extension%22}; _gid=GA1.2.664289273.1640568752; passport_csrf_token_default=3abfa29726529a92769061d3ee5da89b; passport_csrf_token=3abfa29726529a92769061d3ee5da89b; _tea_utm_cache_2018=undefined; passport_auth_status=7daacf9bdae77538d2f3418ec44d6790%2C; passport_auth_status_ss=7daacf9bdae77538d2f3418ec44d6790%2C; sid_guard=199b44d5e2b8b3e9a5cedf347e9a9c86%7C1640568977%7C5184000%7CFri%2C+25-Feb-2022+01%3A36%3A17+GMT; uid_tt=7e6e8b5110e301b030d982347dadd880; uid_tt_ss=7e6e8b5110e301b030d982347dadd880; sid_tt=199b44d5e2b8b3e9a5cedf347e9a9c86; sessionid=199b44d5e2b8b3e9a5cedf347e9a9c86; sessionid_ss=199b44d5e2b8b3e9a5cedf347e9a9c86; sid_ucp_v1=1.0.0-KGIzOTNiMGI1ODUzY2MyNDIwZjgwYzM4M2IyZmJjMWYyYTExNTIwN2UKFwie-8G-_fWFARCRsaSOBhiwFDgCQPEHGgJsZiIgMTk5YjQ0ZDVlMmI4YjNlOWE1Y2VkZjM0N2U5YTljODY; ssid_ucp_v1=1.0.0-KGIzOTNiMGI1ODUzY2MyNDIwZjgwYzM4M2IyZmJjMWYyYTExNTIwN2UKFwie-8G-_fWFARCRsaSOBhiwFDgCQPEHGgJsZiIgMTk5YjQ0ZDVlMmI4YjNlOWE1Y2VkZjM0N2U5YTljODY; n_mh=O_JX28aCZ0XK1jIRAKoU2EV5IiwaFQwiasVZA0D_yg4`,
//     // 爸爸
    `_ga=_ga=GA1.2.538612481.1640499561; _gid=GA1.2.1028052138.1640499561; passport_csrf_token_default=7cd68aea3470a0a620d3cfdbfc0ac329; passport_csrf_token=7cd68aea3470a0a620d3cfdbfc0ac329; _tea_utm_cache_2018=undefined; passport_auth_status=9c8ba5b62073da766966cf9141114d52%2C; passport_auth_status_ss=9c8ba5b62073da766966cf9141114d52%2C; sid_guard=d2423933dd4e6de5d136d1c10af327c3%7C1640499645%7C5184000%7CThu%2C+24-Feb-2022+06%3A20%3A45+GMT; uid_tt=ff2bbc30e8b4f185cf86191dc7ef1a4d; uid_tt_ss=ff2bbc30e8b4f185cf86191dc7ef1a4d; sid_tt=d2423933dd4e6de5d136d1c10af327c3; sessionid=d2423933dd4e6de5d136d1c10af327c3; sessionid_ss=d2423933dd4e6de5d136d1c10af327c3; sid_ucp_v1=1.0.0-KDY3OGE2ZmRlZGI0YWE4MGUxMTkxY2RlNTUzYzMzZjZhY2E4Yjk3NzMKFwjYoPCZiYyuAxC9k6COBhiwFDgCQPEHGgJsZiIgZDI0MjM5MzNkZDRlNmRlNWQxMzZkMWMxMGFmMzI3YzM; ssid_ucp_v1=1.0.0-KDY3OGE2ZmRlZGI0YWE4MGUxMTkxY2RlNTUzYzMzZjZhY2E4Yjk3NzMKFwjYoPCZiYyuAxC9k6COBhiwFDgCQPEHGgJsZiIgZDI0MjM5MzNkZDRlNmRlNWQxMzZkMWMxMGFmMzI3YzM; n_mh=1xiyUL6CjMkCNf1OFkg5xY_26JFc_9EWzt_pOPvfJxo; MONITOR_WEB_ID=d4a167c3-e25e-4bc1-ba11-111be2cbd70d`,
//     // 妈妈
    `_ga=GA1.2.74074857.1641034244; _gid=GA1.2.639086583.1641034244; passport_csrf_token_default=b84db3fdd0fab88569bb13d54ed52cfc; passport_csrf_token=b84db3fdd0fab88569bb13d54ed52cfc; _tea_utm_cache_2018=undefined; passport_auth_status=784503831d621c794a91e2c64a65f525%2C; passport_auth_status_ss=784503831d621c794a91e2c64a65f525%2C; sid_guard=9dfbf9967031f9a531c31a5282809745%7C1641034275%7C5184000%7CWed%2C+02-Mar-2022+10%3A51%3A15+GMT; uid_tt=cef4b06de747ce9a8e80a580bc8ce67d; uid_tt_ss=cef4b06de747ce9a8e80a580bc8ce67d; sid_tt=9dfbf9967031f9a531c31a5282809745; sessionid=9dfbf9967031f9a531c31a5282809745; sessionid_ss=9dfbf9967031f9a531c31a5282809745; sid_ucp_v1=1.0.0-KGE5Yjg4YTVmZDBiNDM5NzNkMzI2NDY0MjcwMjg3YWFiYmNiYTFlODcKFgjo19CZiYwaEKPkwI4GGLAUOAJA8QcaAmxmIiA5ZGZiZjk5NjcwMzFmOWE1MzFjMzFhNTI4MjgwOTc0NQ; ssid_ucp_v1=1.0.0-KGE5Yjg4YTVmZDBiNDM5NzNkMzI2NDY0MjcwMjg3YWFiYmNiYTFlODcKFgjo19CZiYwaEKPkwI4GGLAUOAJA8QcaAmxmIiA5ZGZiZjk5NjcwMzFmOWE1MzFjMzFhNTI4MjgwOTc0NQ; n_mh=x024KdQ3X2k18yT7sSOp2R7PIb_SiVqDbr8JHvqFbdk`,
//     // // 英健
//     // // `_ga=GA1.2.510774970.1635238971; _gid=GA1.2.944387447.1635238971; MONITOR_WEB_ID=d68834d5-e8d8-4a2b-ba30-b99c2a39581f; passport_csrf_token_default=867f0134ec91446bdd64b1a6617b5fcf; passport_csrf_token=867f0134ec91446bdd64b1a6617b5fcf; _tea_utm_cache_2018=undefined; n_mh=O3qfy6rKiRFgoXW2ZtgtI70z7GIj3LwefL1DkqKL0zY; passport_auth_status=a3b42b0ced8928c602dc4a7a843bb7f6,; passport_auth_status_ss=a3b42b0ced8928c602dc4a7a843bb7f6,; sid_guard=4d98c8f20a29cc0bb87ffadfee84df4f|1635239055|5184000|Sat,+25-Dec-2021+09:04:15+GMT; uid_tt=f7ef49f5d823b1cb15482fa6c768f26a; uid_tt_ss=f7ef49f5d823b1cb15482fa6c768f26a; sid_tt=4d98c8f20a29cc0bb87ffadfee84df4f; sessionid=4d98c8f20a29cc0bb87ffadfee84df4f; sessionid_ss=4d98c8f20a29cc0bb87ffadfee84df4f; sid_ucp_v1=1.0.0-KGYzYWI5YmQ4MGNkZjI4ZGM0Njc5OTVhYTRlMjUyODBjY2ZhOWViMDkKFwjH1fDh94zeAhCPid-LBhiwFDgCQOwHGgJsZiIgNGQ5OGM4ZjIwYTI5Y2MwYmI4N2ZmYWRmZWU4NGRmNGY; ssid_ucp_v1=1.0.0-KGYzYWI5YmQ4MGNkZjI4ZGM0Njc5OTVhYTRlMjUyODBjY2ZhOWViMDkKFwjH1fDh94zeAhCPid-LBhiwFDgCQOwHGgJsZiIgNGQ5OGM4ZjIwYTI5Y2MwYmI4N2ZmYWRmZWU4NGRmNGY; odin_tt=ad904772cef33c2e7debea6e15ec84f930410b6c324899479f85a51535c1055fc1c82b11e6cec048170c0b158d24a8b4523124eceffb5eb9ee6cf187e5d80377`,

//     // 面哥
`_ga=GA1.2.610057050.1640765583; _gid=GA1.2.1358722112.1640765583; passport_csrf_token_default=9b10b8714135bcbf09cc30097ba81cf6; passport_csrf_token=9b10b8714135bcbf09cc30097ba81cf6; _tea_utm_cache_2018=undefined; passport_auth_status=2d56c97e101f581d17e4771df5baa81f%2C; passport_auth_status_ss=2d56c97e101f581d17e4771df5baa81f%2C; sid_guard=8f7f9c0e70bed2d63e3e33376515dede%7C1640765612%7C5184000%7CSun%2C+27-Feb-2022+08%3A13%3A32+GMT; uid_tt=c415c2b3c95ebcaa7af565b3a33db1e9; uid_tt_ss=c415c2b3c95ebcaa7af565b3a33db1e9; sid_tt=8f7f9c0e70bed2d63e3e33376515dede; sessionid=8f7f9c0e70bed2d63e3e33376515dede; sessionid_ss=8f7f9c0e70bed2d63e3e33376515dede; sid_ucp_v1=1.0.0-KDQyMWZjY2I4YTAwY2FlZjU2YTg0YmMxODA2M2U5YTIxOGE5ZjU2YTUKFwiOlPDA_fXpBRCssbCOBhiwFDgCQPEHGgJsZiIgOGY3ZjljMGU3MGJlZDJkNjNlM2UzMzM3NjUxNWRlZGU; ssid_ucp_v1=1.0.0-KDQyMWZjY2I4YTAwY2FlZjU2YTg0YmMxODA2M2U5YTIxOGE5ZjU2YTUKFwiOlPDA_fXpBRCssbCOBhiwFDgCQPEHGgJsZiIgOGY3ZjljMGU3MGJlZDJkNjNlM2UzMzM3NjUxNWRlZGU; n_mh=f3t7OQOYQehFMHOw1XWbAEyldeKRnZwBtKzPz-RZY6I; MONITOR_WEB_ID=db8fd6b6-654a-4e50-853f-f1ca289b39d3`,
// // // 孩子
// // // `_ga=GA1.2.1901234029.1635238259; _gid=GA1.2.1629297698.1635238259; passport_csrf_token_default=9a816db307f3b94175ca743086786657; passport_csrf_token=9a816db307f3b94175ca743086786657; _tea_utm_cache_2018=undefined; n_mh=oRHzzrZJSf-X-S5L2GmbjQ7lhgJSsr4VyNQvaHrkt_k; passport_auth_status=99216ef021100a50452d8eec2345ff16%2C; passport_auth_status_ss=99216ef021100a50452d8eec2345ff16%2C; sid_guard=2531f1ad8ed34d740d65e3daa8103314%7C1635238301%7C5184000%7CSat%2C+25-Dec-2021+08%3A51%3A41+GMT; uid_tt=12b21f6c267b573d12ec9b457a92f157; uid_tt_ss=12b21f6c267b573d12ec9b457a92f157; sid_tt=2531f1ad8ed34d740d65e3daa8103314; sessionid=2531f1ad8ed34d740d65e3daa8103314; sessionid_ss=2531f1ad8ed34d740d65e3daa8103314; sid_ucp_v1=1.0.0-KGQ1YTBlNGNlMjNmODY0NTk2NzcwMTNhOTVjNTU0ZDVmZDVmYmIwMzQKFwj9jrDg94yGAxCdg9-LBhiwFDgCQOwHGgJsZiIgMjUzMWYxYWQ4ZWQzNGQ3NDBkNjVlM2RhYTgxMDMzMTQ; ssid_ucp_v1=1.0.0-KGQ1YTBlNGNlMjNmODY0NTk2NzcwMTNhOTVjNTU0ZDVmZDVmYmIwMzQKFwj9jrDg94yGAxCdg9-LBhiwFDgCQOwHGgJsZiIgMjUzMWYxYWQ4ZWQzNGQ3NDBkNjVlM2RhYTgxMDMzMTQ; odin_tt=00834f5785cbb03a5e893e903f4ec8ea96464a976c6f9b7e8b263bc7bd8e44d2539c4940508b78665490a46cbc2410bbf05a1821fe97d55dc43e35f94f680f90; MONITOR_WEB_ID=6842f17b-d1f8-42ab-b10f-802c60c79fa8`,
// // 媳妇的
`_ga=GA1.2.1865770825.1641171398; _gid=GA1.2.602257983.1641171398; passport_csrf_token_default=89d36aa6ab187e59196e38fc0b681c50; passport_csrf_token=89d36aa6ab187e59196e38fc0b681c50; _tea_utm_cache_2018=undefined; passport_auth_status=b2134e40e9adbba173b7b79b3c6ccb7e%2C; passport_auth_status_ss=b2134e40e9adbba173b7b79b3c6ccb7e%2C; sid_guard=f3cd299722a248b4fba7a7942087643e%7C1641171437%7C5184000%7CFri%2C+04-Mar-2022+00%3A57%3A17+GMT; uid_tt=708167989bb0d8ee81795275ce4df7f7; uid_tt_ss=708167989bb0d8ee81795275ce4df7f7; sid_tt=f3cd299722a248b4fba7a7942087643e; sessionid=f3cd299722a248b4fba7a7942087643e; sessionid_ss=f3cd299722a248b4fba7a7942087643e; sid_ucp_v1=1.0.0-KGM5NDljZGU1NDM3Y2VkODBhZjFmN2EyNTA1NzhmMzYyNWQwMzJiNzYKFwjo6oCZiYzSBhDtk8mOBhiwFDgCQPEHGgJsZiIgZjNjZDI5OTcyMmEyNDhiNGZiYTdhNzk0MjA4NzY0M2U; ssid_ucp_v1=1.0.0-KGM5NDljZGU1NDM3Y2VkODBhZjFmN2EyNTA1NzhmMzYyNWQwMzJiNzYKFwjo6oCZiYzSBhDtk8mOBhiwFDgCQPEHGgJsZiIgZjNjZDI5OTcyMmEyNDhiNGZiYTdhNzk0MjA4NzY0M2U; n_mh=bwDbE6ANEMl58No6YSnkobEdkxbX1SV7eL8IQgJ1RDo`,
// 媳妇的微信
`_ga=GA1.2.2077921159.1641130722; _gid=GA1.2.132670722.1641130722; MONITOR_WEB_ID=4c2ddded-44e8-4947-83e3-eaaa0849a8da; passport_csrf_token_default=8ccddb5323a970a548b36f7e66535421; passport_csrf_token=8ccddb5323a970a548b36f7e66535421; n_mh=9-mIeuD4wZnlYrrOvfzG3MuT6aQmCUtmr8FxV8Kl8xY; sid_guard=ce4b91eae211c1b2cabd9f4a21dd92c7%7C1641130751%7C5184000%7CThu%2C+03-Mar-2022+13%3A39%3A11+GMT; uid_tt=488cd73672432f4108f4ed6e2fb5df96; uid_tt_ss=488cd73672432f4108f4ed6e2fb5df96; sid_tt=ce4b91eae211c1b2cabd9f4a21dd92c7; sessionid=ce4b91eae211c1b2cabd9f4a21dd92c7; sessionid_ss=ce4b91eae211c1b2cabd9f4a21dd92c7; sid_ucp_v1=1.0.0-KDRkZDg5NjU5ZTcwMGNiNTgxMmQ1ODA4MmY5ZmUyNmRkN2ZkZGNmY2IKFgjNxMDU0Y2OARD_1caOBhiwFDgIQAsaAmxmIiBjZTRiOTFlYWUyMTFjMWIyY2FiZDlmNGEyMWRkOTJjNw; ssid_ucp_v1=1.0.0-KDRkZDg5NjU5ZTcwMGNiNTgxMmQ1ODA4MmY5ZmUyNmRkN2ZkZGNmY2IKFgjNxMDU0Y2OARD_1caOBhiwFDgIQAsaAmxmIiBjZTRiOTFlYWUyMTFjMWIyY2FiZDlmNGEyMWRkOTJjNw; odin_tt=7570e197cd94e4e79a210f3cb5a3a5f266aa73f47ccdc113083910364f071e346d5c058d2456ba3bb257508b21a2cb108e0ad655f4822b52f252a7df49c80fce; _gat=1; _tea_utm_cache_2608={%22utm_medium%22:%22user_center%22%2C%22utm_campaign%22:%22hdjjgame%22}`
]

$.msgArray = []

!(async () => {
    for (let i=0; i<juejinCookie.length;i++) {
        $.index = i + 1
        $.cookie = juejinCookie[i]
        $.sign = false
        $.login = true
        await $.wait(4000)
        await juejinsign()
        await $.wait(2000)
        if (!$.login) continue
            if (!$.diop_id) {
                let list = await juejinDiopList()
        $.diop_id = list[0].history_id
            } 
        
        await $.wait(2000)
        if (!$.login) continue
        
        await juejinDiop($.diop_id)
        await $.wait(2000)
        if (!$.login) continue
        !$.sign && await juejinLottery()
        if (!$.login) continue
        await $.wait(2000)
        $[`token_${$.index}`] = ''
        $[`gameId_${$.index}`] = ''
        $[`uid_${$.index}`] = ''
        $[`needFresh_${$.index}`] = false
        // 开始游戏
        try {
            await getUid()
        await $.wait(2000)
        await getToken()
        await $.wait(2000)
        await runGame()
    } catch(err){
        console.log(`${$.index}运行游戏出错`, err)
    }

    }
})()
    .catch((e) => {
        $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
    })
    .finally(() => {
        $.done();
        $.msgArray.length && notify.sendNotify($.name, `${$.msgArray.toString()}`);
    })

// 签到
function juejinsign () {
    return new Promise(resolve => {
        $.post({
            url: 'https://api.juejin.cn/growth_api/v1/check_in',
            headers: {
                cookie: $.cookie
            }
        }, (err, resp, data) => {
            console.log('签到', data)
            data = JSON.parse(data)
            if(Number(data.err_no) === 15001) {
                $.sign = true
                $.msgArray.push(`账号${$.index}:${data.err_msg || '今天已签到'}`)
            } else if (Number(data.err_no) === 403) {
                $.login = false
                $.msgArray.push(`账号${$.index}: '登录已失效'}`)
            }
            resolve()
        })
    })
}

// 抽奖
function juejinLottery () {
    return new Promise(resolve => {
        $.post({
            url: 'https://api.juejin.cn/growth_api/v1/lottery/draw',
            headers: {
                cookie: $.cookie
            }
        }, (err, resp, data) => {
            data = JSON.parse(data)
            console.log('抽奖', data)
            data.data && $.msgArray.push(`账号${$.index}抽到了:${data.data.lottery_name}`)
            resolve()
        })
    })
}
// 获取粘福气列表
function juejinDiopList () {
    return new Promise(resolve => {
        $.post({
            url: 'https://api.juejin.cn/growth_api/v1/lottery_history/global_big',
            headers: {
                cookie: $.cookie
            },
            body: JSON.stringify({page_no: 1,page_size: 5})
        }, (err, resp, data) => {
            if(err) {console.log('粘福气列表', err)}
            data = JSON.parse(data)
            resolve(data.data.lotteries)
        })
    })
}
// 粘福气
 function juejinDiop (id) {
    return new Promise(async resolve => {
        let res = await fetch("https://api.juejin.cn/growth_api/v1/lottery_lucky/dip_lucky", {
      "headers": {
            "accept": "*/*",
            "accept-language": "zh-CN,zh;q=0.9",
            "content-type": "application/json",
            "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"96\", \"Google Chrome\";v=\"96\"",
            "sec-ch-ua-mobile": "?0",
"sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-site",
            "cookie": $.cookie,
            "Referer": "https://juejin.cn/",
            "Referrer-Policy": "strict-origin-when-cross-origin"
        },
            "body": JSON.stringify({lottery_history_id:id}),
            "method": "POST"})
        let  data = await res.json()
        console.log('粘福气', data)
        data.data && $.msgArray.push(`账号${$.index}粘福气获得:${data.data.dip_value}\n`)
        resolve()
    })
}
// 获取海底掘金token
async function getToken () {
    let  res = await fetch("https://juejin.cn/get/token", {
                "headers": {
                    "accept": "application/json, text/plain, */*",
                    "accept-language": "zh-CN,zh;q=0.9",
                    "if-none-match": "W/\"211-OtXV4ZfFqrL7zPEl7DTn+tCHt7I\"",
                    "sec-fetch-dest": "empty",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-site": "same-origin",
                    "cookie": $.cookie
                },
                "referrer": "https://juejin.cn/game/haidijuejin/?utm_campaign=hdjjgame&utm_medium=user_center",
                "referrerPolicy": "no-referrer-when-downgrade",
                "body": null,
                "method": "GET",
                "mode": "cors",
                "credentials": "include"
                });
    let token = await res.json()
    $[`token_${$.index}`] = `Bearer ${token.data}`
    return Promise.resolve()
}

// 加密游戏id
function gen_x_tt_gameId () {
    return jwt.sign({
        gameId: $[`gameId_${$.index}`],
        time: (new Date).getTime() + ""
    }, "-----BEGIN EC PARAMETERS-----\nBggqhkjOPQMBBw==\n-----END EC PARAMETERS-----\n-----BEGIN EC PRIVATE KEY-----\nMHcCAQEEIDB7KMVQd+eeKt7AwDMMUaT7DE3Sl0Mto3LEojnEkRiAoAoGCCqGSM49\nAwEHoUQDQgAEEkViJDU8lYJUenS6IxPlvFJtUCDNF0c/F/cX07KCweC4Q/nOKsoU\nnYJsb4O8lMqNXaI1j16OmXk9CkcQQXbzfg==\n-----END EC PRIVATE KEY-----\n", {
        algorithm: "ES256",
        expiresIn: 2592e3,
        header: {
            alg: "ES256",
            typ: "JWT"
        }
});
}
// 获取用户id
async function getUid () {
    let res = await fetch("https://api.juejin.cn/user_api/v1/user/get", {
      "headers": {
        "accept": "application/json, text/plain, */*",
        "accept-language": "zh-CN,zh;q=0.9",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "cookie": $.cookie
      },
      "referrer": "https://juejin.cn/game/haidijuejin/?utm_campaign=hdjjgame&utm_medium=user_center",
      "referrerPolicy": "no-referrer-when-downgrade",
      "body": null,
      "method": "GET",
      "mode": "cors",
      "credentials": "include"
    });
    let data = await res.json()
    // console.log(data)
    $[`uid_${$.index}`] = data.data.user_id
    $[`name_${$.index}`] = data.data.user_name
    return Promise.resolve()
}
// 运行游戏
async function runGame () {
    if (!$[`token_${$.index}`]) {
        $.msgArray.push(`账号${$.index}游戏Token获取失败，无法执行游戏\n`)
        return 
    }
    $[`gameId_${$.index}`] = ''
    $[`needFresh_${$.index}`] = false
    // console.log($[`gameId_${$.index}`], $[`needFresh_${$.index}`], $[`token_${$.index}`])
    await $.wait(2000)
    await startGame()
    if ($[`needFresh_${$.index}`])  {
        console.log('刷新地图 start')
        await $.wait(2000)
        await overGame()
        await $.wait(2000)
        await freshMap()
        await $.wait(2000)
        return runGame()
    }
    // console.log($[`gameId_${$.index}`])
    await $.wait(2000)
    await runCommand()
    if ($[`needFresh_${$.index}`])  {
        console.log('刷新地图 runCommand')
        await $.wait(2000)
        await overGame()
        await $.wait(2000)
        await freshMap()
        await $.wait(2000)
        return runGame()
    }
    await $.wait(2000)
    await overGame()
}

// 刷新地图
async function freshMap () {
    await fetch(`https://juejin-game.bytedance.com/game/sea-gold/game/fresh_map?uid=${$[`uid_${$.index}`]}&time=${new Date().getTime()}`, {
  "headers": {
    "accept": "application/json, text/plain, */*",
    "accept-language": "zh-CN,zh;q=0.9",
    "authorization": $[`token_${$.index}`],
    "content-type": "application/json;charset=UTF-8",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site"
  },
  "referrer": "https://juejin.cn/game/haidijuejin/?utm_campaign=hdjjgame&utm_medium=user_center",
  "referrerPolicy": "no-referrer-when-downgrade",
  "body": "{}",
  "method": "POST",
  "mode": "cors",
  "credentials": "include"
});
    console.log(`账号${$.index}刷新地图完成`)
}
// 运行命令
async function runCommand (command = [{"times":10,"command":["D","L"]},{"times":10,"command":["D","R"]},"2",{"times":10,"command":["D","L"]},"2","R","R","U","L","2"]) {
    let res = await fetch(`https://juejin-game.bytedance.com/game/sea-gold/game/command?uid=${$[`uid_${$.index}`]}&time=${new Date().getTime()}`, {
  "headers": {
    "accept": "application/json, text/plain, */*",
    "accept-language": "zh-CN,zh;q=0.9",
    "authorization": $[`token_${$.index}`],
    "content-type": "application/json;charset=UTF-8",
    "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"96\", \"Google Chrome\";v=\"96\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site",
    "x-tt-gameid": gen_x_tt_gameId()
  },
  "referrer": "https://juejin.cn/",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": JSON.stringify({command: command}),
  "method": "POST",
  "mode": "cors",
  "credentials": "include"
})
    // console.log(res, res.headers)
    let data = await res.json()
    if(data.code === 4009) {
        $[`needFresh_${$.index}`] = true
    }
    // console.log('runCommand', data)
    if (data.data.gameDiamond <= 30) {
        $[`needFresh_${$.index}`] = true
    }
    return Promise.resolve()
}
async function overGame () {
    let res = await fetch(`https://juejin-game.bytedance.com/game/sea-gold/game/over?uid=${$[`uid_${$.index}`]}&time=${new Date().getTime()}`, {
  "headers": {
    "accept": "application/json, text/plain, */*",
    "accept-language": "zh-CN,zh;q=0.9",
    "authorization": $[`token_${$.index}`],
    "content-type": "application/json;charset=UTF-8",
    "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"96\", \"Google Chrome\";v=\"96\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site"
  },
  "referrer": "https://juejin.cn/",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": "{\"isButton\":1}",
  "method": "POST",
  "mode": "cors",
  "credentials": "include"
})
    let data = await res.json()
    // console.log(data.data)
    console.log(`账号${$.index},本次运行获得钻石${data.data.gameDiamond}`)
    if (data.data.todayDiamond < data.data.todayLimitDiamond) { //  还需要进行游戏
        console.log(`账号${$.index}继续游戏,今天已获得${data.data.todayDiamond}`)
        await runGame()
    } else {
        console.log(`账号${$.index}游戏完成`)
        $.msgArray.push(`账号${$.index}游戏今日任务完成，获取到钻石${data.data.todayDiamond}\n`)
        return
    }
}

async function loginGame () {
    console.log('login_game')
    let res = await fetch(`https://juejin-game.bytedance.com/game/sea-gold/user/login?uid=${$[`uid_${$.index}`]}&time=${new Date().getTime()}`, {
  "headers": {
    "accept": "application/json, text/plain, */*",
    "accept-language": "zh-CN,zh;q=0.9",
    "authorization": $[`token_${$.index}`],
    "content-type": "application/json;charset=UTF-8",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site"
  },
  "referrer": "https://juejin.cn/game/haidijuejin/?utm_campaign=hdjjgame&utm_medium=user_center",
  "referrerPolicy": "no-referrer-when-downgrade",
  "body": JSON.stringify({name: $[`name_${$.index}`]}),
  "method": "POST",
  "mode": "cors",
  "credentials": "include"
});
    // console.log(res)
    let data = await res.json()
    console.log('login_game', data)
}

async function auth () {
    await loginGame()
    await $.wait(2000)
    let res = await fetch(`https://juejin-game.bytedance.com/game/sea-gold/user/auth?uid=${$[`uid_${$.index}`]}&time=${new Date().getTime()}`, {
  "headers": {
    "accept": "application/json, text/plain, */*",
    "accept-language": "zh-CN,zh;q=0.9",
    "authorization": $[`token_${$.index}`],
    "content-type": "application/json;charset=UTF-8",
    "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"96\", \"Google Chrome\";v=\"96\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site"
  },
  "referrer": "https://juejin.cn/",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": "{}",
  "method": "POST",
  "mode": "cors",
  "credentials": "include"
});
    // console.log(res, res.headers)
    let data = await res.json()
    console.log('授权', data)
}

async function startGame () {
    // console.log('start', $[`uid_${$.index}`], '------' ,$[`token_${$.index}`])
    let res = await fetch(`https://juejin-game.bytedance.com/game/sea-gold/game/start?uid=${$[`uid_${$.index}`]}&time=${new Date().getTime()}`, {
  "headers": {
    "accept": "application/json, text/plain, */*",
    "accept-language": "zh-CN,zh;q=0.9",
    "authorization": $[`token_${$.index}`],
    "content-type": "application/json;charset=UTF-8",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site",
    "x-tt-gameid": ""
  },
  "referrer": "https://juejin.cn/game/haidijuejin/?utm_campaign=hdjjgame&utm_medium=user_center",
  "referrerPolicy": "no-referrer-when-downgrade",
  "body": JSON.stringify({roleId:2}),
  "method": "POST",
  "mode": "cors",
  "credentials": "include"
})
    let data = await res.json()
    // console.log('start data', data)
    if (data.code === 4007) { // 游戏进行中
        $[`needFresh_${$.index}`] =true
        return 
    } else if (data.code ===0) {
        $[`gameId_${$.index}`] = data.data.gameId
    } else {
        await auth()
        await $.wait(2000)
        await startGame()
        $[`needFresh_${$.index}`] =true
        return
    }
}


// prettier-ignore
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
