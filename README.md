# Metrocasa — Prêmio Reclame Aqui 2026

Versão 4: composição inspirada na referência visual https://clownpay.com.br/, preservando a campanha Metrocasa para o Prêmio Reclame Aqui 2026. Menu flutuante em cápsula, abertura centralizada, tipografia Manrope local, fundo quase preto, botões com profundidade e marca em contorno. Verde-lima da campanha preservado. Cenas fixas durante a rolagem, palavras reveladas conforme o avanço e faixa tipográfica com deslocamento. Imagens, vídeo e destinos pertencem à campanha Metrocasa; não foram incorporadas marcas ou serviços da ClownPay.

## Publicar ou abrir

Extraia o ZIP inteiro. `index.html` é a entrada. Publique seu conteúdo em uma hospedagem estática (GitHub Pages, Vercel ou Render). Preserve as pastas e os nomes dos arquivos. O CSS já está compilado: não é necessário instalar dependências para servir o site.

O compartilhamento nativo depende de HTTPS e do suporte do navegador a arquivos. Os links Baixar ficam disponíveis como alternativa. Cancelar o compartilhamento não dispara um download nem uma mensagem de erro.

## Conteúdo preservado

Arte JPG para Stories, vídeo Felix MP4 e comunicado original. Não foi inventado um endereço de votação: a orientação original é usar o link específico do departamento recebido por e-mail em 02/09.

## Tecnologias

Manrope, Tailwind CSS 3.4.17 compilado, Bootstrap CSS 5.3.3 e Bootstrap Icons 1.11.3 locais. JavaScript sem dependências para animações de rolagem e compartilhamento. Imagens com dimensões reservadas e carregamento tardio; vídeo com capa e sem autoplay. Movimento reduzido respeitado.

Para recompilar as classes Tailwind após editar o HTML:

```sh
npx tailwindcss@3.4.17 -i tailwind.input.css -o assets/tailwind.css --minify
```

## Verificação

Sintaxe JavaScript, compilação Tailwind, referências de arquivos, âncoras e integridade das mídias verificadas. Teste visual em navegador e compartilhamento nativo em dispositivos reais não foram realizados.
