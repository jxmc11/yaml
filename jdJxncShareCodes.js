/*
京喜农场助力码
此助力码要求种子 active 相同才能助力，多个账号的话可以种植同样的种子，如果种子不同的话，会自动跳过使用云端助力
此文件为Node.js专用。其他用户请忽略
支持京东N个账号
 */
//云服务器腾讯云函数等NOde.js用户在此处填写京京喜农场的好友码。
// github action用户的好友助力码填写到Action->Settings->Secrets->new Secret里面(Name填写 JxncShareCodes(此处的Name必须按此来写,不能随意更改),内容处填写助力码,填写规则如下)
// 同一个京东账号的好友助力码用@符号隔开,不同京东账号之间用&符号或者换行隔开,下面给一个示例
// 如: 京东账号1的shareCode1@京东账号1的shareCode2&京东账号2的shareCode1@京东账号2的shareCode2
let JxncShareCodes = [
  '{"smp":"663a8c2ecd946cb7c6350c83e826766a","active":"jdnc_1_3yuanhongshu210422_2","joinnum":"1"}@{"smp":"392a7adfef61983ef8c814fad8bc27ae","active":"jdnc_1_3yuanshupian210601_2","joinnum":"1"}',
  '{"smp":"663a8c2ecd946cb7c6350c83e826766a","active":"jdnc_1_3yuanhongshu210422_2","joinnum":"1"}@{"smp":"392a7adfef61983ef8c814fad8bc27ae","active":"jdnc_1_3yuanshupian210601_2","joinnum":"1"}',
  '{"smp":"663a8c2ecd946cb7c6350c83e826766a","active":"jdnc_1_3yuanhongshu210422_2","joinnum":"1"}@{"smp":"392a7adfef61983ef8c814fad8bc27ae","active":"jdnc_1_3yuanshupian210601_2","joinnum":"1"}',
  '{"smp":"663a8c2ecd946cb7c6350c83e826766a","active":"jdnc_1_3yuanhongshu210422_2","joinnum":"1"}@{"smp":"392a7adfef61983ef8c814fad8bc27ae","active":"jdnc_1_3yuanshupian210601_2","joinnum":"1"}',
  '{"smp":"663a8c2ecd946cb7c6350c83e826766a","active":"jdnc_1_3yuanhongshu210422_2","joinnum":"1"}@{"smp":"392a7adfef61983ef8c814fad8bc27ae","active":"jdnc_1_3yuanshupian210601_2","joinnum":"1"}',
  '{"smp":"663a8c2ecd946cb7c6350c83e826766a","active":"jdnc_1_3yuanhongshu210422_2","joinnum":"1"}@{"smp":"392a7adfef61983ef8c814fad8bc27ae","active":"jdnc_1_3yuanshupian210601_2","joinnum":"1"}',
  '{"smp":"663a8c2ecd946cb7c6350c83e826766a","active":"jdnc_1_3yuanhongshu210422_2","joinnum":"1"}@{"smp":"392a7adfef61983ef8c814fad8bc27ae","active":"jdnc_1_3yuanshupian210601_2","joinnum":"1"}',
  '{"smp":"663a8c2ecd946cb7c6350c83e826766a","active":"jdnc_1_3yuanhongshu210422_2","joinnum":"1"}@{"smp":"392a7adfef61983ef8c814fad8bc27ae","active":"jdnc_1_3yuanshupian210601_2","joinnum":"1"}',
  '{"smp":"663a8c2ecd946cb7c6350c83e826766a","active":"jdnc_1_3yuanhongshu210422_2","joinnum":"1"}@{"smp":"392a7adfef61983ef8c814fad8bc27ae","active":"jdnc_1_3yuanshupian210601_2","joinnum":"1"}',
  '{"smp":"663a8c2ecd946cb7c6350c83e826766a","active":"jdnc_1_3yuanhongshu210422_2","joinnum":"1"}@{"smp":"392a7adfef61983ef8c814fad8bc27ae","active":"jdnc_1_3yuanshupian210601_2","joinnum":"1"}',
  '{"smp":"663a8c2ecd946cb7c6350c83e826766a","active":"jdnc_1_3yuanhongshu210422_2","joinnum":"1"}@{"smp":"392a7adfef61983ef8c814fad8bc27ae","active":"jdnc_1_3yuanshupian210601_2","joinnum":"1"}',
   '{"smp":"663a8c2ecd946cb7c6350c83e826766a","active":"jdnc_1_3yuanhongshu210422_2","joinnum":"1"}@{"smp":"392a7adfef61983ef8c814fad8bc27ae","active":"jdnc_1_3yuanshupian210601_2","joinnum":"1"}',
]
// 判断github action里面是否有京喜农场助力码
if (process.env.JXNC_SHARECODES) {
  if (process.env.JXNC_SHARECODES.indexOf('&') > -1) {
    console.log(`您的京喜农场助力码选择的是用&隔开\n`)
    JxncShareCodes = process.env.JXNC_SHARECODES.split('&');
  } else if (process.env.JXNC_SHARECODES.indexOf('\n') > -1) {
    console.log(`您的京喜农场助力码选择的是用换行隔开\n`)
    JxncShareCodes = process.env.JXNC_SHARECODES.split('\n');
  } else {
    JxncShareCodes = process.env.JXNC_SHARECODES.split();
  }
} else if (process.env.JD_COOKIE) {
  // console.log(`由于您secret里面未提供助力码，故此处运行将会给脚本内置的码进行助力，请知晓！`)
}
for (let i = 0; i < JxncShareCodes.length; i++) {
  const index = (i + 1 === 1) ? '' : (i + 1);
  exports['JxncShareCode' + index] = JxncShareCodes[i];
}
