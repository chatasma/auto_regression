import pandas as pd
import numpy as np
import statsmodels.api as sm
import json

df = pd.read_excel('XLIF.xlsx')
# We have to make row 1 the column header
df.columns = df.iloc[1]
df = df.iloc[2:]
# df = df.drop(np.nan, axis = 1)
df = df.loc[:, df.columns.notnull()]

for col in df.columns:
  df[col] = df[col].apply(pd.to_numeric, errors='coerce')

# print(df.info(verbose = True))
# lets test for LL_pre

# we want to test, pre/post/final
ll = 'LL_final'



newDFs = []

def formulaInputBuilder(indep):
  value = " ".join([(indep[j] + " +") for j in range(len(indep)) if not (j == len(indep)-1)])
  value += " " + indep[-1]
  return value

# print(formulaInputBuilder(['a', 'b', 'c']))

# age + smoker + bmi + asa + postoperative_comp + num_levels
for val in ['LL_pre', 'LL_post', ll]:
    model = sm.OLS.from_formula('{} ~ {}'.format(val, 
        formulaInputBuilder('age + smoker + bmi + asa + postoperative_comp + num_levels'.split(' + '))), df).fit()
    vals = round(model.pvalues, 5)
    data = {'p-values': vals, 'coefficients': model.params}
    dfnew = pd.DataFrame(data)
    dfnew.columns = pd.MultiIndex.from_product([[val], ['p-values', 'coefficients']])
    newDFs.append(dfnew)

test = pd.concat(newDFs, axis = 1)
test.to_json('output.json')
# test.to_csv('output.csv')
