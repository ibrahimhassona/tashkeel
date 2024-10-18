/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: false, // إذا كنت تستخدم بنية التطبيق الجديدة، يمكنك تعيينها إلى true
    layers: true, // تمكين layers إذا كنت بحاجة لذلك
  },
  webpack: (config) => {
    config.experiments = {
      asyncWebAssembly: true, // تمكين WebAssembly غير المتزامن
      syncWebAssembly: true,  // تمكين WebAssembly المتزامن
      layers: true,           // تأكد من تمكين layers هنا
    };

    // إضافة قاعدة لمعالجة ملفات .wasm
    config.module.rules.push({
      test: /\.wasm$/,
      type: 'webassembly/async', // تحميل WebAssembly بطريقة غير متزامنة
    });

    return config;
  },
};

export default nextConfig;
