
const fs = require('fs')
const yaml = require('js-yaml')
const axios = require("axios")

const global = {
    clash: false,
    clashMeta: false,
    nodefree: false
}

async function getssrUrl (url = 'https://nodefree.org/') {
    const data = await axios({
        url
    })
    return data.data
  }
  
  async function writeFile (url, name) {
    const res = await axios({
        url
    }).catch(e => null)
    if (!res) {
        global[name] = false
        return 
    }
    fs.writeFileSync(name + ".yaml", res.data, 'utf8')
    fs.writeFileSync(name + ".yaml.txt", res.data, 'utf8')
    global[name] = true
  }
  
  async function getnodefreeFile() {
    const t1 = await getssrUrl("https://nodefree.org/")
    const today = t1.match(/https\:\/\/nodefree.org.{4,10}\.html/)[0]
    const t2 = await getssrUrl(today)
    const yaml = t2.match(/https\:\/\/nodefree.githubrowcontent.com.{4,20}\.yaml/)[0]
    await writeFile(yaml, 'nodefree')
  }
  
  function getProxy(filePath) {
    const doc = yaml.load(fs.readFileSync(filePath, "utf-8"));
    return doc.proxies;
  }
  
  function getRule(filePath) {
      const doc = yaml.load(fs.readFileSync(filePath, "utf-8"));
      return {
          ruleProviders: doc['rule-providers'],
          rules: doc.rules
      };
    }
  
  function writeProxy(proxies, ruleProviders, rules) {
    let file = {
      "mixed-port": 7890,
      "allow-lan": false,
      mode: "rule",
      "log-level": "info",
      "external-controller": "127.0.0.1:9999",
      dns: {
        enable: true,
        listen: "0.0.0.0:53",
        ipv6: false,
        "default-nameserver": ["223.5.5.5", "114.114.114.114"],
        nameserver: [
          "223.5.5.5",
          "114.114.114.114",
          "119.29.29.29",
          "180.76.76.76",
        ],
        "enhanced-mode": "fake-ip",
        "fake-ip-range": "198.18.0.1/16",
        "fake-ip-filter": [
          "*.lan",
          "*.localdomain",
          "*.example",
          "*.invalid",
          "*.localhost",
          "*.test",
          "*.local",
          "*.home.arpa",
          "router.asus.com",
          "localhost.sec.qq.com",
          "localhost.ptlogin2.qq.com",
          "+.msftconnecttest.com",
        ],
      },
      tun: {
        enable: true,
        "auto-route": true,
        "auto-detect-interface": true,
        "dns-hijack": [
          "114.114.114.114",
          "180.76.76.76",
          "119.29.29.29",
          "223.5.5.5",
          "8.8.8.8",
          "8.8.4.4",
          "1.1.1.1",
          "1.0.0.1",
        ],
      },
      proxies: [],
      "proxy-groups": [
        {
          name: "🚀 节点选择",
          type: "select",
          proxies: ["♻️ 自动选择", "DIRECT"],
        },
        {
          name: "♻️ 自动选择",
          type: "url-test",
          url: "http://www.gstatic.com/generate_204",
          interval: 300,
          tolerance: 50,
          proxies: [],
        },
        {
          name: "🌍 国外媒体",
          type: "select",
          proxies: ["🚀 节点选择", "♻️ 自动选择", "🎯 全球直连"],
        },
        {
          name: "📲 电报信息",
          type: "select",
          proxies: ["🚀 节点选择", "🎯 全球直连"],
        },
        {
          name: "Ⓜ️ 微软服务",
          type: "select",
          proxies: ["🎯 全球直连", "🚀 节点选择"],
        },
        {
          name: "🍎 苹果服务",
          type: "select",
          proxies: ["🎯 全球直连", "🚀 节点选择"],
        },
        {
          name: "🎯 全球直连",
          type: "select",
          proxies: ["DIRECT", "🚀 节点选择", "♻️ 自动选择"],
        },
        {
          name: "🛑 全球拦截",
          type: "select",
          proxies: ["REJECT", "DIRECT"],
        },
        {
          name: "🍃 应用净化",
          type: "select",
          proxies: ["REJECT", "DIRECT"],
        },
        {
          name: "🐟 漏网之鱼",
          type: "select",
          proxies: ["🚀 节点选择", "🎯 全球直连", "♻️ 自动选择"],
        },
      ],
      "rule-providers": ruleProviders,
      rules,
    };
  
    const names = new Map();
    for (let index = 0; index < proxies.length; index++) {
      const element = proxies[index];
      if (element.name.indexOf("CN") > 0) {
        continue
      }
      const t = names.get(element.name)
      if (t) {
        if (t.server != element.server) {
            element.name += ~~(Math.random() * 100);
        } else {
            continue
        }
      }
      names.set(element.name, element);
    }
    file.proxies = [...names.values()];
    file["proxy-groups"][0].proxies = file["proxy-groups"][0].proxies.concat(
      ...names.keys()
    );
    file["proxy-groups"][1].proxies = file["proxy-groups"][1].proxies.concat(
      ...names.keys()
    );
    file["proxy-groups"][2].proxies = file["proxy-groups"][2].proxies.concat(
      ...names.keys()
    );
    file["proxy-groups"][3].proxies = file["proxy-groups"][3].proxies.concat(
      ...names.keys()
    );
    file["proxy-groups"][4].proxies = file["proxy-groups"][4].proxies.concat(
      ...names.keys()
    );
    file["proxy-groups"][5].proxies = file["proxy-groups"][5].proxies.concat(
      ...names.keys()
    );
    file["proxy-groups"][9].proxies = file["proxy-groups"][9].proxies.concat(
      ...names.keys()
    );
    const str = yaml.dump(file);
    
    const temp = `# 创建时间：${(new Date()).toLocaleString()}` + "\n"
  
    fs.writeFileSync("./total.yaml", temp + str);
  }
  
  
  async function getcfmemFile() {
    const t1 = await getssrUrl("https://www.cfmem.com/")
    const today = t1.match(/https:\/\/www.cfmem.com\/2024\/.+vpn\.html/)[0]
    const t2 = await getssrUrl(today)
    const yaml = t2.match(/https:\/\/fs\.v2rayse\.com\/share\/.{4,20}\.yaml/g)
    await writeFile(yaml[0], 'clash')
    await writeFile(yaml[1], 'clashMeta')
  }
  
 (async () => {
   try {
      await getcfmemFile();
   } catch(e){}
   try {
     await getnodefreeFile();
   } catch(e) {

   }
    

    var clashMeta =getProxy("./clashMeta.yaml")
    
    var options = getRule("./clashMeta.yaml")

    var nodefree = []
    try {
      nodefree = global.nodefree ? getProxy("./nodefree.yaml") : []
    } catch(_) {}

    writeProxy([...clashMeta, ...nodefree], options.ruleProviders, options.rules);
 })()