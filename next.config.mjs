/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: false, // تأكد من تعطيل appDir إذا لم تكن تستخدم بنية التطبيق الجديدة
  },
  webpack: (config) => {
    config.experiments = {
      asyncWebAssembly: true, // تمكين WebAssembly غير المتزامن
      syncWebAssembly: true,  // تمكين WebAssembly المتزامن
      layers: true,
      // لا تقم بتمكين layers هنا
    };
    
    // قاعدة لمعالجة ملفات .wasm
    config.module.rules.push({
      test: /\.wasm$/,
      type: 'webassembly/async', // تحميل WebAssembly بطريقة غير متزامنة
    });

    return config;
  },
};

export default nextConfig;
