import pandas as pd

df = pd.read_csv('Glossary_CT_Math.csv')
df.to_json('Glossary_CT_Math.json', orient='records', lines=True)