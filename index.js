const puppeteer = require('puppeteer');
const fs = require('fs-extra');
const path = require('path');
const globby = require('globby');

(async () => {
  // // 加载已解压的扩展
  // const pathToExtensionsUnpack = (await globby(
  //   [
  //     path.join(__dirname, 'chrome_extensions', '*', '*', 'manifest.json'),
  //     path.join(__dirname, 'chrome_extensions', '*', 'manifest.json')
  //   ]
  // )).map(p => path.dirname(p));
  // // 加载已打包的扩展
  // const pathToExtensionsPack = await globby(
  //   [
  //     path.join(__dirname, 'chrome_extensions', '*.crx'),
  //     path.join(__dirname, 'chrome_extensions', '*', '*.crx'),
  //   ],
  //   {
  //     deep: 1
  //   }
  // );
  //
  // const pathToExtensions = [...pathToExtensionsUnpack, ...pathToExtensionsPack];
  const browser = await (puppeteer.launch({
    // 若是手动下载的chromium需要指定chromium地址, 默认引用地址为 /项目目录/node_modules/puppeteer/.local-chromium/
    //设置超时时间
    timeout: 15000,
    //如果是访问https页面 此属性会忽略https错误
    ignoreHTTPSErrors: true,
    // 打开开发者工具, 当此值为true时, headless总为false
    devtools: false,
    // 关闭headless模式, 会打开浏览器
    headless: false,
    // 加载扩展
    args: [
      // `--disable-extensions-except=${pathToExtensions.join(',')}`,
      // `--load-extension=${pathToExtensions.join(',')}`,
      '--disable-web-security'
    ]
  }));
  const page = await browser.newPage();
  await page.goto('https://www.baidu.com');

  const thehtml = await page.content();
  // browser.close();
  await fs.ensureDir(path.join(__dirname, 'output'));
  await fs.writeFile(path.join(__dirname, 'output', 'result.html'), thehtml);
})();
