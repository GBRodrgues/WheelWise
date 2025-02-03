import { defineConfig } from 'vite';
import { VitePluginNode } from 'vite-plugin-node';

export default defineConfig({
  server: {
    port: 3031, // Defina a porta do servidor
  },
  plugins: [
    ...VitePluginNode({
      adapter: 'express', // ou 'fastify' se estiver usando Fastify
      appPath: './server.js', // Caminho para o arquivo principal do backend
      exportName: 'default', // Nome da exportação do app no arquivo principal
    }),
  ],
});
