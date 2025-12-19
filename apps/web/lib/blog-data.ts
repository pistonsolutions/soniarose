export interface BlogPost {
    slug: string;
    title: string;
    date: string;
    author: string;
    excerpt: string;
    image?: string;
    content: string; // HTML content
    metaTitle: string;
    metaDescription: string;
}

export const blogPosts: BlogPost[] = [
    {
        slug: 'comment-choisir-le-bon-moment-pour-vendre',
        title: 'Comment choisir le bon moment pour vendre',
        date: '12 Déc 2024',
        author: 'Sonia Rose',
        excerpt: 'Découvrez les signes émotionnels et pratiques qui indiquent qu’il est temps de vendre votre maison.',
        image: '/blog/comment-choisir-le-bon-moment-pour-vendre.jpg',
        metaTitle: 'Comment choisir le bon moment pour vendre sa maison | Conseils humains & expertise immobilière – Sonia Rose',
        metaDescription: 'Découvrez les signes émotionnels et pratiques qui indiquent qu’il est temps de vendre votre maison. Analyse humaine, conseils intuitifs et expertise Sonia Rose.',
        content: `
      <h2>Les signes émotionnels qui montrent que ta maison ne te correspond plus</h2>
      <p>On pense souvent qu’on va savoir quand ce sera le bon moment pour vendre. Mais dans la vraie vie, c’est rarement un déclic clair. Ce sont plutôt des impressions, des inconforts, des petits signes qui reviennent… et qui finissent par t’envoyer un message.</p>
      
      <h3>Quand l’entretien devient un poids</h3>
      <p>Une maison, c’est beau. Mais c’est aussi de l’ouvrage. Et parfois… ça devient lourd. Les tâches faciles deviennent épuisantes : tondre le gazon, pelleter, entretenir un grand terrain, nettoyer une grande maison. Si tu te sens plus épuisé que bien dans la vraie vie, ce n’est pas banal.</p>

      <h3>Quand ton énergie change mais que la maison reste figée</h3>
      <p>C’est subtil… mais puissant. Tu rentres chez toi et l’ambiance n’est plus pareille. Il manque quelque chose. Tu ne vibres plus dans l’espace. Parfois c’est toi qui as changé. Parfois c’est la maison qui ne suit plus ton évolution.</p>

      <h3>Quand tu commences à te projeter ailleurs</h3>
      <p>Tu observes des quartiers. Tu regardes des maisons “juste pour voir”. Tu scrolles sur Centris pour rien. Tu imagines une autre lumière, une autre ambiance. Ce n’est pas un hasard. Ton esprit parle avant ton cœur.</p>

      <h3>Les facteurs financiers qui influencent le bon moment</h3>
      <p>Parfois, la maison devient une charge financière qui empêche de profiter de la vie. Vendre pour réduire ses obligations, ce n'est pas reculer, c'est se donner de l'air.</p>

      <h3>Le besoin de tourner une page</h3>
      <p>Tu n’es pas malheureuse, mais tu n’es plus pleinement bien. Tu sens que quelque chose est terminé. Tu sens que tu as besoin d’un renouveau. Et souvent, l’environnement doit suivre ce changement.</p>

      <h3>En résumé : comment savoir si c’est le moment pour toi</h3>
      <p>Vendre une maison, ce n’est pas juste financier. C’est logique, émotionnel et instinctif. Tu n’as pas besoin d’être certain à 100 % pour commencer à t’informer. Si tu te reconnais dans un des signes, c’est une invitation à réfléchir.</p>
    `
    },
    {
        slug: 'ce-que-les-vendeurs-regrettent-le-plus',
        title: 'Ce que les vendeurs regrettent le plus',
        date: '05 Déc 2024',
        author: 'Sonia Rose',
        excerpt: 'Découvrez les 5 regrets les plus fréquents des vendeurs et comment les éviter.',
        image: '/blog/ce-que-les-vendeurs-regrettent-le-plus.jpg',
        metaTitle: 'Ce que les vendeurs regrettent le plus | Conseils immobiliers',
        metaDescription: 'Découvrez les 5 regrets les plus fréquents des vendeurs et comment les éviter pour vendre au bon prix, sans stress et sans mauvaises surprises.',
        content: `
      <h2>Une vente immobilière, c’est un mélange d’émotions, d’intuition et de décisions.</h2>
      <p>Voici les regrets les plus fréquents observés chez les vendeurs.</p>

      <h3>1. Attendre trop longtemps avant de mettre en vente</h3>
      <p>Souvent, on attend le "moment parfait". Mais pendant ce temps, le marché change, la maison se dégrade tranquillement, et on perd des opportunités. Le meilleur moment, c'est quand vous êtes prêt.</p>

      <h3>2. Sous-estimer l’importance de la première impression</h3>
      <p>Les acheteurs décident dans les premières secondes. Négliger le ménage, l'odeur ou la lumière lors des visites est une erreur coûteuse qui fait fuir les meilleures offres.</p>

      <h3>3. Fixer un prix trop élevé “pour essayer”</h3>
      <p>C'est le classique. "On va essayer plus haut, on verra bien". Le problème ? La maison reste sur le marché, les acheteurs se méfient, et on finit souvent par vendre moins cher que si on avait affiché le juste prix dès le départ.</p>

      <h3>4. Ne pas corriger quelques petits détails avant la mise en marché</h3>
      <p>Une poignée brisée, une peinture écaillée... ces petits détails envoient le message que la maison est mal entretenue. Quelques centaines de dollars de réparations peuvent rapporter des milliers à la vente.</p>

      <h3>5. Accepter une offre trop vite… ou trop tard</h3>
      <p>La peur de perdre une offre ou l'espoir d'en avoir une meilleure peut brouiller le jugement. C'est là qu'un courtier d'expérience est essentiel pour garder la tête froide.</p>

      <h2>Ce que les vendeurs réalisent après la vente</h2>
      <p>Après la vente, les vendeurs me disent souvent : "Si j'avais su, je l'aurais fait plus tôt". La paix d'esprit qui vient après avoir tourné la page vaut souvent plus que tout le reste.</p>
    `
    },
    {
        slug: 'l-art-de-tourner-une-page-sans-se-perdre',
        title: 'L’art de tourner une page sans se perdre',
        date: '28 Nov 2024',
        author: 'Sonia Rose',
        excerpt: 'Pourquoi est-ce si difficile de tourner une page ? Les signes et le bon moment pour avancer.',
        image: '/blog/l-art-de-tourner-une-page-sans-se-perdre.jpg',
        metaTitle: 'L’art de tourner une page sans se perdre | Avancer sans regret – Sonia Rose',
        metaDescription: 'Pourquoi est-ce si difficile de tourner une page ? Les signes, les émotions et le bon moment pour avancer — une perspective humaine et claire par Sonia Rose.',
        content: `
      <h2>Pourquoi c’est difficile de tourner une page ?</h2>
      <p>C'est l'attachement, les souvenirs, la peur de se tromper, de regretter, ou de perdre un confort connu. C'est normal d'avoir peur du vide.</p>

      <h2>Les signes qui montrent que tu es prête à passer à autre chose</h2>
      <p>Tu te sens étouffée dans ton espace. Tu fais des compromis qui ne t’alignent plus. Le sentiment de “chez soi” n’est plus là. Tes besoins ont changé. Tu t’imagines vivre ailleurs.</p>

      <h2>Dans la maison comme dans la vie : rester trop longtemps peut coûter cher</h2>
      <p>Perte de valeur, perte d’opportunités, perte de momentum dans le marché. Mais surtout, perte de temps dans une vie qui ne te ressemble plus.</p>

      <h2>Tourner une page, ce n’est pas perdre… c’est choisir mieux</h2>
      <p>C'est une évolution personnelle. Un cycle de vie qui se termine pour laisser place à un nouveau départ. C'est l'occasion de se réaligner.</p>

      <h2>Comment savoir que c’est le bon moment d’avancer ?</h2>
      <p>Tu te sens plus épuisée que bien. Tu poses des questions qui reviennent souvent. Tu veux retrouver ton énergie et ta paix.</p>

      <h2>Conclusion : tourner la page, c’est se réaligner</h2>
      <p>Ce n’est pas impulsif. Ce n’est pas une fuite. C’est un choix pour soi. Revenir à une version alignée de toi-même.</p>
    `
    },
    {
        slug: '7-signes-que-cest-peut-etre-le-moment-de-vendre',
        title: '7 signes que c’est peut-être le moment de vendre',
        date: '20 Nov 2024',
        author: 'Sonia Rose',
        excerpt: 'Certains signes te montrent que ta maison ne correspond plus à ta vie actuelle.',
        image: '/blog/7-signes-que-cest-peut-etre-le-moment-de-vendre.jpg',
        metaTitle: '7 signes que c’est peut-être le moment de vendre | Sonia Rose, courtière immobilière',
        metaDescription: 'Certains signes te montrent que ta maison ne correspond plus à ta vie actuelle. Voici 7 indices simples, concrets et émotionnels pour savoir si c’est peut-être le bon moment de vendre.',
        content: `
      <p>Certaines maisons nous parlent sans qu’on s’en rende compte. À travers ces sept indices concrets et émotionnels, tu pourras mieux savoir si ta maison t’offre encore ce dont tu as besoin — ou si un nouveau chapitre s’annonce.</p>
      
      <h3>1. La maison ne correspond plus à ta vie actuelle</h3>
      <p>C’était parfait il y a 10 ans… mais plus aujourd’hui. Les enfants partent, une séparation, une nouvelle routine... Quand tu regardes autour et que tu te dis : « Ce n’est plus vraiment ce dont j’ai besoin », c’est un signe.</p>

      <h3>2. L’entretien devient un poids au lieu d’un plaisir</h3>
      <p>Si tu te sens plus épuisé que bien dans la vraie vie à cause de l'entretien, ce n’est pas banal.</p>

      <h3>3. Tu ne te sens plus “chez toi” comme avant</h3>
      <p>C’est subtil… mais puissant. Tu rentres chez toi et l’ambiance n’est plus pareille. Il manque quelque chose.</p>

      <h3>4. Tes besoins d’espace ont changé</h3>
      <p>Famille qui s’agrandit ou qui réduit. Besoin de plus de rangement ou de moins pour éviter le chaos. Si la maison ne suit pas ta réalité, tu vas le ressentir chaque jour.</p>

      <h3>5. Tu penses souvent à autre chose… un autre quartier, une autre vibe</h3>
      <p>Tu observes des quartiers. Tu regardes des maisons “juste pour voir”. Ton esprit parle avant ton cœur.</p>

      <h3>6. Ta maison est rendue plus lourde que ta vie</h3>
      <p>Une maison trop grande… ou trop petite… pour aujourd’hui. Quand ça fit plus, ça se ressent : trop de pièces, trop d'escaliers, trop de coûts.</p>

      <h3>7. Tu sens que tu es prêt(e) à passer à autre chose</h3>
      <p>C’est le signe le plus important. Tu sens que quelque chose est terminé. Tu sens que tu as besoin d’un renouveau.</p>
    `
    },
    {
        slug: 'quand-ta-maison-ne-te-ressemble-plus',
        title: 'Quand ta maison ne te ressemble plus',
        date: '15 Nov 2024',
        author: 'Sonia Rose',
        image: '/blog/quand-ta-maison-ne-te-ressemble-plus.jpg',
        excerpt: 'Découvre les signes subtils qu’il est temps d’évoluer vers un nouvel espace.',
        metaTitle: 'Quand ta maison ne te ressemble plus | Signes qu’un changement s’impose',
        metaDescription: 'Ta maison ne reflète plus qui tu es devenu(e) ? Découvre les signes subtils et émotionnels qu’il est temps d’évoluer vers un nouvel espace aligné avec ta vie.',
        content: `
      <h2>Ce moment où l’on se rend compte que quelque chose a changé</h2>
      <p>Parfois, sans qu’on s’en aperçoive, la maison qu’on aimait ne reflète plus qui on est devenu.</p>

      <h3>1. Tu ne sens plus “chez toi” même si tout semble correct en apparence</h3>
      <p>Tout est là, mais l'âme n'y est plus. C'est comme un vêtement qui ne fait plus.</p>

      <h3>2. Ton style de vie a évolué, mais ta maison non</h3>
      <p>Tu as changé de travail, de passion, d'horaire, mais ta maison t'impose une routine qui ne te convient plus.</p>

      <h3>3. Tu ressens un poids au lieu d’un confort</h3>
      <p>Rentrer à la maison devrait être un soulagement, pas une charge.</p>

      <h3>4. Tu évites certaines pièces ou tu restes toujours dans les mêmes</h3>
      <p>Si tu n'utilises que 30% de ta maison, c'est que le reste ne te sert plus.</p>

      <h3>5. Tu rêves d’autre chose, encore et encore</h3>
      <p>Ces rêves ne sont pas des fuites, ce sont des messages.</p>

      <h3>Conclusion — Quand avancer devient une nécessité intérieure</h3>
      <p>Écouter ces signes, c'est se respecter. C'est admettre qu'on a évolué et que c'est correct de vouloir un environnement qui nous soutient.</p>
    `
    },
    {
        slug: '80-pourcent-succes-7-premiers-jours',
        title: '80 % du succès se joue dans les 7 premiers jours',
        date: '08 Nov 2024',
        author: 'Sonia Rose',
        image: '/blog/80-pourcent-succes-7-premiers-jours.jpg',
        excerpt: 'Pourquoi les premiers jours déterminent l’intérêt, les visites et même le prix final.',
        metaTitle: 'Immobilier : Pourquoi les 7 premiers jours sont décisifs',
        metaDescription: 'Les premiers jours déterminent l’intérêt, les visites et même le prix final. Voici pourquoi les 7 premiers jours définissent le succès d’une mise en marché.',
        content: `
      <h2>Pourquoi les 7 premiers jours sont décisifs</h2>
      <p>Les premières impressions comptent énormément en immobilier. Quand une maison arrive sur le marché, les premiers jours ne sont pas juste “importants”. Ils sont cruciaux.</p>

      <h3>Les acheteurs regardent chaque nouvelle propriété… mais seulement une fois</h3>
      <p>Dans les premiers jours, tout le monde regarde. Quand ton listing est tout en haut, dans les résultats “nouveaux”, il a un impact immédiat.</p>

      <h3>Les acheteurs veulent être les premiers — pas les derniers</h3>
      <p>Ils ont peur de manquer une opportunité. Si la maison est en ligne depuis 3-4 semaines… l’effet tombe. Ils se disent : « Pourquoi elle n’est pas vendue ? »</p>

      <h3>Le prix juste dès le départ = le maximum que tu peux aller chercher</h3>
      <p>Si tu arrives au bon prix dès le début, tu génères plus de visites, plus d'intérêt et tu reçois les meilleures offres. Le momentum des premiers jours n’arrive qu’une seule fois.</p>
    `
    }
];
