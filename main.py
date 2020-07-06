import sys, getopt

import pandas as pd
import numpy as np
import statsmodels.api as sm
import json

USAGE = 'main.py -d <dependent variables comma separated> -i <independent variables comma separated>'

def main(argv):

  # Read in arguments
  try:
    opts, args = getopt.getopt(argv, "hd:i:", ["dependent=","independent="])
  except getopt.GetoptError:
    print(USAGE) 
    sys.exit(2)
  
  for opt, arg in opts:
    if opt == '-h':
      print(USAGE)
      sys.exit()
    
    if opt in ("-d", "--dependent"):
      dependents = arg.split(',')
    if opt in ("-i", "--independent"):
      independents = arg.split(',')

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

  X = formulaInputBuilder(dependents)

  # 'age + smoker + bmi + asa + postoperative_comp + num_levels' 
  # ['LL_pre', 'LL_post', ll]
  for val in independents:
      model = sm.OLS.from_formula('{} ~ {}'.format(val, X), df).fit()
      vals = round(model.pvalues, 5)
      data = {'p-values': vals, 'coefficients': model.params, 'Odds Ratio': np.e**model.params}
      dfnew = pd.DataFrame(data)
      dfnew.columns = pd.MultiIndex.from_product([[val], ['p-values', 'coefficients', 'Odds Ratio']])
      newDFs.append(dfnew)

  test = pd.concat(newDFs, axis = 1)
  print(test)
  test.to_json('output.json')
  # test.to_csv('output.csv')

if __name__ == "__main__":
  main(sys.argv[1:])