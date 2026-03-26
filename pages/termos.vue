<script setup lang="ts">
definePageMeta({ layout: 'default' })

useSeoMeta({
  title: 'Termos de Uso — mkit',
  description: 'Leia os Termos de Uso da plataforma mkit.',
})
</script>

<template>
  <div class="legal-page">
    <div class="legal-inner">
      <div class="legal-header">
        <p class="legal-label">Legal</p>
        <h1>Termos de Uso</h1>
        <p class="legal-date">Última atualização: 26 de março de 2026</p>
      </div>

      <div class="legal-body">
        <section>
          <h2>1. Aceitação dos Termos</h2>
          <p>
            Ao acessar ou utilizar a plataforma mkit (<strong>mkit.com.br</strong>), você concorda com estes Termos de Uso.
            Caso não concorde com qualquer disposição, não utilize nossos serviços.
          </p>
        </section>

        <section>
          <h2>2. Descrição do Serviço</h2>
          <p>
            O mkit é uma plataforma que permite a criadores de conteúdo ("Creators") conectar sua conta do Instagram
            e gerar automaticamente um <em>media kit</em> digital — um bio site público com métricas reais do perfil,
            portfólio de trabalhos e informações de contato para marcas parceiras.
          </p>
          <p>O serviço é oferecido em duas modalidades:</p>
          <ul>
            <li><strong>Free:</strong> gratuito, com funcionalidades básicas e identificação mkit no rodapé do bio site.</li>
            <li><strong>Pro:</strong> assinatura mensal com funcionalidades avançadas, sem branding mkit e com analytics de visitantes.</li>
          </ul>
        </section>

        <section>
          <h2>3. Conta e Acesso</h2>
          <p>
            O acesso ao mkit é realizado exclusivamente via autenticação OAuth com o Instagram (Meta).
            Ao fazer login, você autoriza o mkit a acessar dados públicos e de negócios da sua conta conforme
            as permissões solicitadas.
          </p>
          <p>
            Você é responsável por manter a segurança do acesso à sua conta e por todas as atividades
            realizadas sob ela. Notifique-nos imediatamente em caso de uso não autorizado.
          </p>
        </section>

        <section>
          <h2>4. Uso Aceitável</h2>
          <p>Ao utilizar o mkit, você concorda em não:</p>
          <ul>
            <li>Utilizar o serviço para fins ilegais, fraudulentos ou prejudiciais a terceiros;</li>
            <li>Publicar conteúdo falso, enganoso ou que viole direitos de terceiros no seu bio site;</li>
            <li>Tentar acessar sistemas ou dados de outros usuários sem autorização;</li>
            <li>Realizar engenharia reversa, scraping ou uso automatizado da plataforma sem permissão;</li>
            <li>Violar as Políticas de Uso da Plataforma Meta/Instagram.</li>
          </ul>
        </section>

        <section>
          <h2>5. Conteúdo do Usuário</h2>
          <p>
            Você mantém todos os direitos sobre o conteúdo que disponibiliza no seu bio site (fotos, textos, portfólio).
            Ao publicar conteúdo no mkit, você nos concede uma licença limitada, não exclusiva e gratuita para
            exibir esse conteúdo exclusivamente para operar o serviço.
          </p>
          <p>
            Os dados do Instagram exibidos no bio site (seguidores, engajamento, posts) são obtidos
            via API oficial da Meta e pertencem à plataforma Instagram/Meta, sujeitos às suas próprias políticas.
          </p>
        </section>

        <section>
          <h2>6. Pagamentos e Assinaturas (Plano Pro)</h2>
          <p>
            O Plano Pro é cobrado mensalmente. O cancelamento pode ser feito a qualquer momento pelo painel do usuário,
            com efeito ao final do período já pago. Não realizamos reembolsos de períodos parciais.
          </p>
        </section>

        <section>
          <h2>7. Disponibilidade e Alterações</h2>
          <p>
            Nos esforçamos para manter o serviço disponível continuamente, mas não garantimos disponibilidade
            ininterrupta. Podemos modificar, suspender ou encerrar funcionalidades a qualquer momento,
            notificando os usuários com antecedência razoável quando possível.
          </p>
          <p>
            Estes Termos podem ser atualizados periodicamente. Alterações relevantes serão comunicadas por e-mail
            ou notificação na plataforma. O uso continuado após a notificação implica aceitação dos novos termos.
          </p>
        </section>

        <section>
          <h2>8. Limitação de Responsabilidade</h2>
          <p>
            O mkit é fornecido "como está". Não nos responsabilizamos por danos indiretos, lucros cessantes ou
            perda de dados decorrentes do uso da plataforma, na extensão máxima permitida pela legislação aplicável.
          </p>
        </section>

        <section>
          <h2>9. Lei Aplicável</h2>
          <p>
            Estes Termos são regidos pelas leis da República Federativa do Brasil. Fica eleito o foro da
            Comarca de Salvador, Bahia, para dirimir quaisquer controvérsias.
          </p>
        </section>

        <section>
          <h2>10. Contato</h2>
          <p>
            Dúvidas sobre estes Termos? Entre em contato pelo e-mail
            <a href="mailto:contato@mkit.com.br">contato@mkit.com.br</a>.
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
