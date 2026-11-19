# moroccanweb-workers — MWW Digital Studio

Site officiel de **MWW Digital Studio (Moroccan Web Workers)** — Marrakech · Casablanca.
**We Build. We Create. We Grow.**

Next.js 15 · FR / EN / AR (RTL) · SEO (hreflang, sitemap, données structurées Google) · design bleu futuriste.

---

## Déployer sur cPanel avec Git™ Version Control

Le dossier **`cpanel-app/`** contient le site **déjà compilé** : rien à compiler sur le serveur.

### Première installation (une seule fois)
1. **Setup Node.js App** → **Create Application**
   - Node.js version : **20** (ou ≥ 18.18) · Mode : **Production**
   - Application root : **`mww-site`**
   - Application URL : votre domaine · Startup file : **`server.js`**
   - **Create**
2. **Git™ Version Control** → **Create**
   - Clone URL : `https://github.com/anwarbanner/moroccanweb-workers.git`
   - Repository Path : `repositories/moroccanweb-workers` · **Create**
3. Dans Git™ Version Control → **Manage** → onglet **Pull or Deploy** → **Deploy HEAD Commit**
   (le fichier `.cpanel.yml` copie `cpanel-app/` dans `~/mww-site` et redémarre l'app).
4. **Setup Node.js App** → ✏️ sur l'app → **Run NPM Install** → **Restart**.
5. Ouvrez `https://votredomaine.com/fr/`

> Si `public_html` contient un ancien `index.html` / `index.php`, supprimez-le.
> En cas d'erreur 503 : vérifiez la version Node, refaites **Run NPM Install** puis **Restart** ; voir `~/mww-site/stderr.log`.
> Si le dépôt est **privé**, cPanel demande une clé SSH ou un token GitHub pour le clonage.

### Mettre à jour le site
Sur votre ordinateur :
```
npm install
npm run build:cpanel      # recompile et met à jour cpanel-app/
git add -A
git commit -m "mise à jour"
git push
```
Puis dans cPanel → Git™ Version Control → **Manage** → **Pull or Deploy** → **Update from Remote** → **Deploy HEAD Commit**.
(Run NPM Install n'est à refaire que si la version de Next.js change.)

---

## Développement local
```
npm install
npm run dev          # http://localhost:3000/fr/
```

| Commande | Résultat |
|---|---|
| `npm run dev` | aperçu local avec rechargement automatique |
| `npm run build:cpanel` | version Node.js prête pour cPanel dans `cpanel-app/` |
| `npm run build` | version Node.js (Vercel, VPS…) dans `.next/standalone` |
| `npm run build:static` | site statique dans `out/` (à envoyer dans `public_html`, sans Node.js) |

## Modifier le contenu
- **Textes** : `lib/dict/fr.ts`, `lib/dict/en.ts`, `lib/dict/ar.ts` (le texte entre `*astérisques*` s'affiche en dégradé bleu)
- **E-mail, téléphone, WhatsApp, domaine, réseaux sociaux** : `lib/site.ts`
- **Photos** : `lib/images.ts` (photos Unsplash, licence gratuite ; vos photos → `public/photos/`)
- **Couleurs & animations** : `app/globals.css`
- **Sitemap / robots** : `public/sitemap.xml`, `public/robots.txt` (à modifier si le domaine change)

## Après la mise en ligne (SEO)
1. cPanel → **SSL/TLS Status** → **Run AutoSSL** (https)
2. **Google Search Console** → ajouter le domaine → envoyer `https://www.moroccanwebworkers.com/sitemap.xml`
3. **Google Business Profile** pour Marrakech et Casablanca
4. Ajouter vos liens Instagram / LinkedIn / Facebook / TikTok dans `lib/site.ts`
5. Remplacer les projets « Exemple » du portfolio par vos vrais projets
