<script setup lang="ts">
definePageMeta({ layout: 'default' })

useSeoMeta({
  title: 'Política de Privacidade — mkit',
  description: 'Saiba como o mkit coleta, usa e protege seus dados pessoais.',
})
</script>

<template>
  <div class="legal-page">
    <div class="legal-inner">
      <div class="legal-header">
        <p class="legal-label">Legal</p>
        <h1>Política de Privacidade</h1>
        <p class="legal-date">Última atualização: 26 de março de 2026</p>
      </div>

      <div class="legal-body">
        <section>
          <h2>1. Introdução</h2>
          <p>
            A <strong>mkit</strong> ("nós", "nosso") está comprometida com a proteção dos seus dados pessoais.
            Esta Política descreve quais dados coletamos, como os utilizamos e quais são seus direitos,
            em conformidade com a <strong>Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018)</strong>
            e, onde aplicável, com o Regulamento Geral de Proteção de Dados (GDPR) da União Europeia.
          </p>
        </section>

        <section>
          <h2>2. Dados que Coletamos</h2>
          <p>Ao se cadastrar e utilizar o mkit, coletamos os seguintes dados:</p>

          <h3>2.1 Dados do Instagram (via API oficial da Meta)</h3>
          <ul>
            <li>Nome de usuário (handle) e nome de exibição;</li>
            <li>Foto de perfil pública;</li>
            <li>Biografia (bio do perfil);</li>
            <li>Número de seguidores e de contas seguidas;</li>
            <li>Número total de publicações;</li>
            <li>Taxa de engajamento (curtidas, comentários, alcance — via Instagram Insights);</li>
            <li>Posts recentes (imagens, legendas, métricas de desempenho);</li>
            <li>Dados de audiência agregados (faixas etárias, gênero, localização — sem identificação individual).</li>
          </ul>

          <h3>2.2 Dados da conta mkit</h3>
          <ul>
            <li>Endereço de e-mail vinculado à conta Meta (se disponibilizado);</li>
            <li>Informações de portfólio adicionadas manualmente (marcas, campanhas, resultados);</li>
            <li>Dados de pagamento — <strong>não armazenamos dados de cartão</strong>; pagamentos são processados por gateway certificado PCI-DSS.</li>
          </ul>

          <h3>2.3 Dados de uso e técnicos</h3>
          <ul>
            <li>Endereço IP e dados de geolocalização aproximada;</li>
            <li>Tipo e versão do navegador/dispositivo;</li>
            <li>Páginas visitadas, tempo de sessão e interações na plataforma;</li>
            <li>Logs de acesso para fins de segurança.</li>
          </ul>
        </section>

        <section>
          <h2>3. Como Usamos seus Dados</h2>
          <p>Utilizamos seus dados exclusivamente para:</p>
          <ul>
            <li>Gerar e exibir seu bio site público em <strong>mkit.com.br/@seuhandle</strong>;</li>
            <li>Autenticar e manter sua sessão na plataforma;</li>
            <li>Atualizar automaticamente suas métricas do Instagram;</li>
            <li>Processar pagamentos do Plano Pro;</li>
            <li>Enviar comunicações transacionais (confirmações, alertas de conta);</li>
            <li>Melhorar o produto com análises de uso agregadas e anonimizadas;</li>
            <li>Cumprir obrigações legais e regulatórias.</li>
          </ul>
          <p>
            <strong>Não vendemos, alugamos ou compartilhamos seus dados pessoais com terceiros para fins comerciais.</strong>
          </p>
        </section>

        <section>
          <h2>4. Compartilhamento de Dados</h2>
          <p>Seus dados podem ser compartilhados apenas com:</p>
          <ul>
            <li><strong>Meta/Instagram:</strong> como controladora dos dados do Instagram, para autenticação e acesso à API;</li>
            <li><strong>Provedores de infraestrutura:</strong> servidores em nuvem (hospedagem, banco de dados) com contratos de proteção de dados;</li>
            <li><strong>Gateway de pagamento:</strong> para processamento seguro de assinaturas Pro;</li>
            <li><strong>Autoridades legais:</strong> quando exigido por lei ou ordem judicial.</li>
          </ul>
        </section>

        <section>
          <h2>5. Bio Site Público</h2>
          <p>
            Ao criar um bio site no mkit, você está explicitamente autorizando a exibição pública das
            informações do seu perfil do Instagram (nome, foto, métricas, portfólio) em
            <strong>mkit.com.br/@seuhandle</strong>.
          </p>
          <p>
            Qualquer pessoa com o link pode acessar essas informações sem autenticação.
            Você pode tornar seu bio site privado ou excluir sua conta a qualquer momento pelo painel.
          </p>
        </section>

        <section>
          <h2>6. Retenção de Dados</h2>
          <p>
            Mantemos seus dados enquanto sua conta estiver ativa. Após a exclusão da conta:
          </p>
          <ul>
            <li>Dados do bio site são removidos imediatamente do acesso público;</li>
            <li>Dados pessoais são excluídos permanentemente em até <strong>30 dias</strong>;</li>
            <li>Logs de segurança e dados fiscais podem ser retidos pelo prazo legal exigido (até 5 anos).</li>
          </ul>
        </section>

        <section>
          <h2>7. Seus Direitos (LGPD)</h2>
          <p>Você tem direito a:</p>
          <ul>
            <li><strong>Acesso:</strong> solicitar cópia dos seus dados pessoais que mantemos;</li>
            <li><strong>Correção:</strong> corrigir dados incompletos, inexatos ou desatualizados;</li>
            <li><strong>Exclusão:</strong> solicitar a exclusão dos seus dados ("direito ao esquecimento");</li>
            <li><strong>Portabilidade:</strong> receber seus dados em formato estruturado e legível por máquina;</li>
            <li><strong>Revogação de consentimento:</strong> revogar o acesso do mkit à sua conta Instagram a qualquer momento via configurações da Meta;</li>
            <li><strong>Oposição:</strong> opor-se ao tratamento de dados em determinadas circunstâncias.</li>
          </ul>
          <p>
            Para exercer qualquer desses direitos, entre em contato pelo e-mail
            <a href="mailto:privacidade@mkit.com.br">privacidade@mkit.com.br</a>.
            Responderemos em até 15 dias úteis.
          </p>
        </section>

        <section>
          <h2>8. Segurança</h2>
          <p>
            Adotamos medidas técnicas e organizacionais para proteger seus dados, incluindo:
            criptografia em trânsito (HTTPS/TLS), autenticação via tokens seguros (Laravel Sanctum),
            acesso restrito aos dados por nossa equipe e monitoramento de atividades suspeitas.
          </p>
          <p>
            Em caso de incidente de segurança que afete seus dados, notificaremos você e a
            Autoridade Nacional de Proteção de Dados (ANPD) conforme exigido pela LGPD.
          </p>
        </section>

        <section>
          <h2>9. Cookies e Rastreamento</h2>
          <p>
            Utilizamos cookies essenciais para manter sua sessão autenticada (cookie de sessão Sanctum)
            e cookies analíticos para entender o uso da plataforma. Você pode desativar cookies não
            essenciais nas configurações do seu navegador.
          </p>
        </section>

        <section>
          <h2>10. Menores de Idade</h2>
          <p>
            O mkit não é direcionado a menores de 18 anos. Não coletamos conscientemente dados de menores.
            Se você acredita que um menor forneceu dados ao mkit, entre em contato para remoção imediata.
          </p>
        </section>

        <section>
          <h2>11. Alterações nesta Política</h2>
          <p>
            Podemos atualizar esta Política periodicamente. Alterações relevantes serão notificadas
            com antecedência mínima de 15 dias por e-mail ou aviso na plataforma.
            O uso continuado após a notificação implica aceitação da versão atualizada.
          </p>
        </section>

        <section>
          <h2>12. Contato e Encarregado de Dados (DPO)</h2>
          <p>
            Para questões sobre privacidade, proteção de dados ou para exercer seus direitos:
          </p>
          <ul>
            <li>E-mail: <a href="mailto:privacidade@mkit.com.br">privacidade@mkit.com.br</a></li>
            <li>Para exclusão de dados via Instagram: acesse as configurações da Meta e revogue o acesso do app <strong>mkit</strong>.</li>
          </ul>
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

.legal-body section h3 {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--ld-text);
  margin-top: 1.25rem;
  margin-bottom: 0.625rem;
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
  margin-bottom: 0.75rem;
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
