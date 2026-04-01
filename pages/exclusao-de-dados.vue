<script setup lang="ts">
definePageMeta({ layout: 'default' })

useSeoMeta({
  title: 'Exclusão de Dados — mkit',
  description: 'Instruções sobre como solicitar a exclusão de seus dados da plataforma mkit.',
})
</script>

<template>
  <div class="legal-page">
    <div class="legal-inner">
      <div class="legal-header">
        <p class="legal-label">Legal</p>
        <h1>Exclusão de Dados</h1>
        <p class="legal-date">Última atualização: 1 de abril de 2026</p>
      </div>

      <div class="legal-body">
        <section>
          <h2>1. Como excluir seus dados via Facebook/Instagram</h2>
          <p>
            O mkit utiliza o login oficial do Instagram. De acordo com as políticas da Meta, você pode revogar o nosso acesso
            e solicitar a exclusão de sua conta pela sua própria conta do Facebook ou Instagram. Ao fazer isso, não manteremos
            nenhum dado extra associado à sua conta.
          </p>
          <p>Para revogar o acesso via Instagram (Mobile):</p>
          <ul>
            <li>Acesse seu perfil do Instagram e toque no menu (três barras) no canto superior direito.</li>
            <li>Vá em <strong>Configurações e atividade</strong>.</li>
            <li>Em <strong>Seu app e suas mídias</strong>, toque em <strong>Permissões do site e do app</strong>.</li>
            <li>Toque em <strong>Apps e sites</strong>.</li>
            <li>Na aba <strong>Ativos</strong>, encontre o <strong>mkit</strong> e toque em <strong>Remover</strong>.</li>
          </ul>
        </section>

        <section>
          <h2>2. Exclusão de dados manual pela equipe de suporte</h2>
          <p>
            Caso você prefira que nossa equipe apague manualmente os seus registros em nossos servidores (incluindo seu micro bio site,
            portfólio, métricas cacheadas e token de acesso), você pode solicitar a remoção permanente de dados por e-mail:
          </p>
          <ul>
            <li>Envie um e-mail para <strong>contato@mkit.com.br</strong> com o assunto "Solicitação de Exclusão de Dados".</li>
            <li>No corpo do e-mail, informe o @usuario (handle) cadastrado e o endereço de e-mail vinculado ao seu Instagram para fins de validação.</li>
            <li>Processaremos e efetuaremos a exclusão definitiva em até 2 dias úteis, confirmando a ação enviando uma resposta ao seu e-mail.</li>
          </ul>
        </section>

        <section>
          <h2>3. Quais dados são removidos?</h2>
          <p>
            Ao ter sua conta excluída (seja por revogação na Meta ou via suporte), todos os dados vinculados armazenados
            em nossas bases (como seu @handle, nome completo, biografia, URLs de fotos de perfil, IDs, métricas cacheadas e links de
            portfólio) serão completamente excluídos. Links para o seu bio site (/@handle) deixarão de funcionar imediatamente
            após a confirmação da remoção. 
          </p>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
.legal-page {
  padding: 8rem 2rem 6rem;
}

.legal-inner {
  max-width: 720px;
  margin: 0 auto;
}

.legal-header {
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--ld-border);
}

.legal-label {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--ld-accent);
  font-weight: 600;
  margin-bottom: 1rem;
}

.legal-header h1 {
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: clamp(2rem, 4vw, 2.75rem);
  font-weight: 400;
  line-height: 1.1;
  color: var(--ld-text);
  margin-bottom: 0.75rem;
}

.legal-date {
  font-size: 0.875rem;
  color: var(--ld-text-tertiary);
}

.legal-body {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.legal-body section h2 {
  font-size: 1.0625rem;
  font-weight: 600;
  color: var(--ld-text);
  margin-bottom: 0.875rem;
}

.legal-body p {
  font-size: 0.9375rem;
  line-height: 1.75;
  color: var(--ld-text-secondary);
  margin-bottom: 0.75rem;
}

.legal-body p:last-child {
  margin-bottom: 0;
}

.legal-body ul {
  padding-left: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.legal-body ul li {
  font-size: 0.9375rem;
  line-height: 1.7;
  color: var(--ld-text-secondary);
}

.legal-body a {
  color: var(--ld-accent);
  text-decoration: underline;
  text-underline-offset: 3px;
}

.legal-body a:hover {
  color: var(--ld-accent-dark);
}
</style>
