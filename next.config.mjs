/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      appDir: true, // إذا كنت تستخدم تطبيقًا جديدًا، يمكنك ضبطه على true أو الإبقاء على false حسب احتياجاتك
      layers: true, // تمكين layers
    },
    webpack: (config) => {
      config.experiments = {
        asyncWebAssembly: true, // تمكين WebAssembly
        syncWebAssembly: true, // تمكين WebAssembly (الذي كان يستخدم في Webpack 4)
        layers: true, // تمكين layers
      };
      config.module.rules.push({
        test: /\.wasm$/,
        type: 'webassembly/async', // استخدام WebAssembly كعنصر غير متزامن
      });
      return config;
    },
  };
  
  export default nextConfig;
  