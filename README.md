# Tibia Progress Dashboard

Dashboard pessoal para acompanhar personagens de Tibia, progressao de level, investimentos em Tibia Coins, hunts e delivery de creature products.

## Como rodar localmente

Abra o PowerShell nesta pasta e execute:

```powershell
python -m http.server 5174
```

Depois acesse:

```text
http://localhost:5174
```

## Sincronizacao

Os dados podem ser sincronizados com Supabase. A configuracao publica fica em `supabase-config.js`.

Nunca coloque a Secret key do Supabase neste projeto.

