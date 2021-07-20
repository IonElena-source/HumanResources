
import sys
numeFisier=sys.argv[1]
an=numeFisier[0]+numeFisier[1]+numeFisier[2]+numeFisier[3]
print(an)

import pandas as pd
hr = pd.read_excel(numeFisier)
col_names = hr.columns.tolist()
#punem coloanele in variabila col_names si o facem lista
#print(col_names)
hr.head() #afisam primele 5 inregistrari
hr.shape
import numpy as np #numpy este un pachet stiinfic opens-source pt calcule stiintifice si numerice
hr['Plecat'].value_counts() #afiseaza cate valori de 0 si cta evalori de unu va avea coloane left, adica cati angajati au plecat sau nu
hr.groupby('Plecat').mean()
#se va calcula media pe fiecare criteriu pentru angajatii care au plecat si care nu, adica coloana left va deveni index pt randuri, si vom avea
#nivelul mediu de satisfactie pt cei cu 0 si pe cei 1,..
import matplotlib 
#---grafic de tip bare care compara salariul si numarul angajatilor care au plecat-----

import matplotlib.pyplot as plt
table=pd.crosstab(hr.Salariu, hr.Plecat)
table.div(table.sum(1).astype(float), axis=0).plot(kind='bar', stacked=True)
plt.title('Influenta salariului asupra plecarii angajatilor')
plt.xlabel('Nivel Salariu')
plt.ylabel('Angajati')
plt.savefig('../client/public/files/salariuBarChart'+an)
#---grafic de tip bare care compara salariul si numarul angajatilor care au plecat-----
#-----histrograme pt fiecare caracteristica in parte
num_bins = 9
fig=hr.hist(bins=num_bins, figsize=(20,9),grid=False)
[x.title.set_size(22) for x in fig.ravel()]
plt.tight_layout()
plt.savefig("../client/public/files/hr_histogram_plots"+an)
plt.clf()

#---------histograme pt fiecare caracteristica in parte


#transform variabilele categoriale in variabile dummy pentru modelare
#o variabila dummy poate sa ia doar valoarea 0 sau 1 pentru a aindica prezenta sau absenta unui efect categorial
#adica, daca coloana salariu are doar valori mic, mare, mediu facem din ea trei variabile,
#salariu mic care poate sa ia 1 sau 0 daca salariul este sau nu mic
#salariu mare care poate sa ia 1 sau 0 daca salariul este sau nu mare
cat_vars=['Salariu']
for var in cat_vars:
    cat_list='var'+'_'+var
    #pd.getDumies, converteste variabilele categoriale in variabile dummy
    cat_list = pd.get_dummies(hr[var], prefix=var)
    hr1=hr.join(cat_list)
    hr=hr1

#in acest moment hr contine si coloanele denumite dupa variabilele dummy si coloanele cu variabile categoricale
#stergem coloanele intiaile
hr.drop(hr.columns[[8]], axis=1, inplace=True)
#print('hr.column.values')
#print(hr.columns.values)

#avem o coloana care reprezinta efectul rezultatul si aceea e coloana de plecat
#celelalte coloane reprezinta predictorii care duc la acest rezultat
#separam predictorii de coloana rezultat
hr_vars=hr.columns.values.tolist()
#y va fii efectul, rezultatul
y=['Plecat']
#X va contine coloanele predictor
X=[i for i in hr_vars if i not in y]
#----------
from sklearn.feature_selection import RFE
from sklearn.linear_model import LogisticRegression
#model = LogisticRegression()
#rfe = RFE(model,5) #RFE ia 2 argument, primul este algoritmul, al doilea este numarul de proprietati, algoritmul
#algoritmul va da arborele de decizie
#logistic regressioon va da anumiti coeficienti mari sau mici, variabilele care au asociate coeficientii mai mari sunt mai importante
#rfe = rfe.fit(hr[X], hr[y])
#print(rfe.support_) #un vector de true si false, in care vor fi 10 true -uri corespunzatoare coloanelor alese
#print(rfe.ranking_)  #un vector de ranking, in care 1 va fii asociat coloanelor aleese pt predictie

#cols reprezinta lista de coloane predictor din setul de date
cols=['Nivel satisfactie', 'Ultima evaluare', 'Timp în companie(în ani)', 'Incidente la munca', 'Promovat', 
      'Salariu_mare', 'Salariu_mic'] 
X=hr[cols]
y=hr['Plecat']
#-----------

#Logistic Regression Model
#importam functia train_test_split pentru a separa cum trebuie intreg setul de date
#Sklearn foloseste permutarile pentru a genera spargere
from sklearn.model_selection import train_test_split
#(1-0.3)% reprezinta proportia din setul de date initial luat in calcul pentru separare
#random_state reprezinta o valoare random ce influenteaza seturile de date rezultatel
#daca este o valoare fixa, seturile de date rezultate vor de fiecare data aceleasi
#seturile train este pentru a le folosi in model, pentru ca modelul sa invete automat din ele
#seturile de test sunt pentru o evaluare impartiala al modelului final
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=0)


#------------Regresia Logistica
from sklearn.linear_model import LogisticRegression
from sklearn import metrics
logreg = LogisticRegression() #construirea unei instante de tip regresie logistica
logreg.fit(X_train, y_train) #modelul invata din relatiile dintre setul de valori ale variabilei dep 
#si setul de valori ale variabilei indep, gasind cea mai potrivita functie ale caror rezultate previzionate sa fie cat mai apropaiate

from sklearn.metrics import accuracy_score 
#functie ce determina cat de apropiate au fost valorile previzionate unui model fata de valorile actuale
#print('Logistic regression accuracy: {:.3f}'.format(accuracy_score(y_test, logreg.predict(X_test))))
#------Regresia Logistica

from sklearn.ensemble import RandomForestClassifier
rf = RandomForestClassifier()
rf.fit(X_train, y_train)
#print('Random Forest Accuracy: {:.3f}'.format(accuracy_score(y_test, rf.predict(X_test))))

from sklearn.svm import SVC
svc = SVC()
svc.fit(X_train, y_train)
#print('Support vector machine accuracy: {:.3f}'.format(accuracy_score(y_test, svc.predict(X_test))))

from sklearn import model_selection
from sklearn.model_selection import cross_val_score
kfold = model_selection.KFold(n_splits=10, random_state=7)
modelCV = RandomForestClassifier()
scoring = 'accuracy'
results = model_selection.cross_val_score(modelCV, X_train, y_train, cv=kfold, scoring=scoring)
#print("10-fold cross validation average accuracy: %.3f" % (results.mean()))
from sklearn.metrics import classification_report
#print(classification_report(y_test, rf.predict(X_test)))
y_pred = rf.predict(X_test)
from sklearn.metrics import confusion_matrix
import seaborn as sns
forest_cm = metrics.confusion_matrix(y_pred, y_test, [1,0])

#print(classification_report(y_test, logreg.predict(X_test)))
# logreg_y_pred = logreg.predict(X_test)
# logreg_cm = metrics.confusion_matrix(logreg_y_pred, y_test, [1,0])

#print(classification_report(y_test, svc.predict(X_test)))
# svc_y_pred = svc.predict(X_test)
# svc_cm = metrics.confusion_matrix(svc_y_pred, y_test, [1,0])

# from sklearn.metrics import roc_auc_score
# from sklearn.metrics import roc_curve
# logit_roc_auc = roc_auc_score(y_test, logreg.predict(X_test))
# fpr, tpr, thresholds = roc_curve(y_test, logreg.predict_proba(X_test)[:,1])
# rf_roc_auc = roc_auc_score(y_test, rf.predict(X_test))
# rf_fpr, rf_tpr, rf_thresholds = roc_curve(y_test, rf.predict_proba(X_test)[:,1])

feature_labels = np.array(['Nivel satisfactie', 'Ultima evaluare', 'Timp în companie(în ani)', 'Incidente la munca', 'Promovat', 
      'Salariu_mare', 'Salariu_mic'] )
importance = rf.feature_importances_
feature_indexes_by_importance = importance.argsort()
rezultate={}
labels=[]
date=[]
for index in feature_indexes_by_importance:
    #print('{}-{:.2f}%'.format(feature_labels[index], (importance[index] *100.0)))

    rezultate[feature_labels[index]]=importance[index]*100.0
    labels.append(feature_labels[index])
    date.append(importance[index]*100.0)
print(rezultate)


# Pass the x and y cordinates of the bars to the
# function. The label argument gives a label to the data.
plt.figure(figsize=[24, 14])
plt.barh(labels,
date, align='center', label="Data 1")
plt.legend()
ax = plt.gca()
for tick in ax.yaxis.get_major_ticks():
    tick.label.set_fontsize(18)

# plt.title('Influenta factorilor asupra plecarii angajatilor')
plt.tight_layout()
plt.savefig('../client/public/files/analiza'+an)
plt.clf()

# sys.stdout.write("{} {}".format(rezultate, ""))
# print(labels)

