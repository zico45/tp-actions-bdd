# Réponses aux questions de cours

## 1. Quelle est la différence entre un job et une étape (step) ?
Un job est un ensemble d'étapes exécuté sur une même machine (un runner). Une étape (step) est une action ou une commande individuelle à l'intérieur d'un job. Les étapes d'un job s'exécutent l'une après l'autre, et chaque job démarre sur un runner neuf.

## 2. Pourquoi les jobs python, node, java et php s'exécutent-ils en même temps ? Comment imposer un ordre ?
Par défaut, les jobs sont indépendants : GitHub les lance en parallèle sur des runners différents, ce qui fait gagner du temps. Pour imposer un ordre, on utilise le mot-clé `needs`, par exemple `needs: [python, node, java, php]` pour que le job build attende les 4 jobs de tests.

## 3. Pourquoi ne faut-il jamais écrire un mot de passe de production dans le fichier YAML ? Où faut-il le mettre ?
Le fichier YAML est versionné : toute personne ayant accès au dépôt peut le lire (tout le monde si le dépôt est public), et le mot de passe reste dans l'historique Git même après suppression. Il faut le stocker dans les secrets GitHub (Settings > Secrets and variables > Actions) et le lire avec `${{ secrets.NOM }}`. GitHub masque sa valeur dans les logs.

## 4. Pourquoi la base de données est-elle recréée à chaque exécution ? Quel est l'avantage pour les tests ?
Le runner est une machine neuve à chaque exécution, donc la base repart de zéro grâce à `db/setup.sh`. Les tests partent ainsi d'un état connu et reproductible, sans dépendre des exécutions précédentes. Les résultats sont fiables : un test qui échoue vient du code, pas de données restées dans la base.

## 5. Quelle est la différence entre un test unitaire et un test d'intégration ? De quel type sont les tests de ce TP ?
Un test unitaire vérifie une petite partie du code de façon isolée (une fonction, sans dépendance externe). Un test d'intégration vérifie que plusieurs éléments fonctionnent ensemble, par exemple le code et la base de données. Les tests de ce TP sont des tests d'intégration, car ils utilisent la vraie base PostgreSQL.
