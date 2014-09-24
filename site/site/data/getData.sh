#!/bin/bash

#curl 'https://jobmine.ccol.uwaterloo.ca/psc/SS/EMPLOYEE/WORK/c/UW_CO_STUDENTS.UW_CO_JOBDTLS?UW_CO_JOB_ID=00245228' -H 'Pragma: no-cache' -H 'Accept-Encoding: gzip,deflate,sdch' -H 'Accept-Language: en-US,en;q=0.8' -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.122 Safari/537.36' -H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8' -H 'Cache-Control: no-cache' -H 'Cookie: __utma=131842571.2123019864.1410378691.1411306683.1411435983.6; __utmc=131842571; __utmz=131842571.1411435983.6.6.utmcsr=google|utmccn=(organic)|utmcmd=organic|utmctr=(not%20provided); __utma=201735050.1070386533.1411306687.1411515084.1411522190.7; __utmb=201735050.3.10.1411522190; __utmc=201735050; __utmz=201735050.1411306687.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); cecsprod-80-PORTAL-PSJSESSIONID=BLSlR5zmyU0NsiapEieOwhW0E60rBSwX!942974574; ExpirePage=https://jobmine.ccol.uwaterloo.ca/psp/SS/; PS_LOGINLIST=https://jobmine.ccol.uwaterloo.ca/SS; PS_TOKEN=AAAAqQECAwQAAQAAAAACvAAAAAAAAAAsAARTaGRyAgBOcQgAOAAuADEAMBRaL30VopJXGVf4mIyCXRcvoKwOzQAAAGkABVNkYXRhXXicHcnNCkBAFMXx/yBLeREaQ2FLspjyMSVLz+D9PJzDPfU7t3uB20RxgkETPZ85OyOegcCq+JSJhTnj4OTSb2QjNDgsFQ2FupeOWla0lNqstHSyV+r/4ngBpngMDw==; SignOnDefault=QCKBROOK; https%3a%2f%2fjobmine.ccol.uwaterloo.ca%2fpsp%2fss%2femployee%2fwork%2frefresh=list:%20%7c|; HPTabName=DEFAULT; PS_TOKENEXPIRE=24_Sep_2014_01:30:43_GMT' -H 'Connection: keep-alive' --compressed

curl1="curl 'https://jobmine.ccol.uwaterloo.ca/psc/SS/EMPLOYEE/WORK/c/UW_CO_STUDENTS.UW_CO_JOBDTLS?UW_CO_JOB_ID="
curl2="' -H 'Pragma: no-cache' -H 'Accept-Encoding: gzip,deflate,sdch' -H 'Accept-Language: en-US,en;q=0.8' -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.122 Safari/537.36' -H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8' -H 'Cache-Control: no-cache' -H 'Cookie: __utma=131842571.2123019864.1410378691.1411306683.1411435983.6; __utmc=131842571; __utmz=131842571.1411435983.6.6.utmcsr=google|utmccn=(organic)|utmcmd=organic|utmctr=(not%20provided); __utma=201735050.1070386533.1411306687.1411515084.1411522190.7; __utmb=201735050.3.10.1411522190; __utmc=201735050; __utmz=201735050.1411306687.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); cecsprod-80-PORTAL-PSJSESSIONID=BLSlR5zmyU0NsiapEieOwhW0E60rBSwX!942974574; ExpirePage=https://jobmine.ccol.uwaterloo.ca/psp/SS/; PS_LOGINLIST=https://jobmine.ccol.uwaterloo.ca/SS; PS_TOKEN=AAAAqQECAwQAAQAAAAACvAAAAAAAAAAsAARTaGRyAgBOcQgAOAAuADEAMBRaL30VopJXGVf4mIyCXRcvoKwOzQAAAGkABVNkYXRhXXicHcnNCkBAFMXx/yBLeREaQ2FLspjyMSVLz+D9PJzDPfU7t3uB20RxgkETPZ85OyOegcCq+JSJhTnj4OTSb2QjNDgsFQ2FupeOWla0lNqstHSyV+r/4ngBpngMDw==; SignOnDefault=QCKBROOK; https%3a%2f%2fjobmine.ccol.uwaterloo.ca%2fpsp%2fss%2femployee%2fwork%2frefresh=list:%20%7c|; HPTabName=DEFAULT; PS_TOKENEXPIRE=24_Sep_2014_01:30:43_GMT' -H 'Connection: keep-alive' --compressed"

download () {
	id=$1
	eval "$curl1$id$curl2 > $id.txt"
}

id="00245000"

#curl 'https://jobmine.ccol.uwaterloo.ca/psc/SS/EMPLOYEE/WORK/c/UW_CO_STUDENTS.UW_CO_JOBDTLS?UW_CO_JOB_ID=00245000' -H 'Pragma: no-cache' -H 'Accept-Encoding: gzip,deflate,sdch' -H 'Accept-Language: en-US,en;q=0.8' -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.122 Safari/537.36' -H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8' -H 'Cache-Control: no-cache' -H 'Cookie: __utma=131842571.2123019864.1410378691.1411306683.1411435983.6; __utmc=131842571; __utmz=131842571.1411435983.6.6.utmcsr=google|utmccn=(organic)|utmcmd=organic|utmctr=(not%20provided); __utma=201735050.1070386533.1411306687.1411499842.1411515084.6; __utmc=201735050; __utmz=201735050.1411306687.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); cecsprod-80-PORTAL-PSJSESSIONID=xwKk3Yc4OvYsB1te8U3aGr8PD0Kb-mR6!942974574; ExpirePage=https://jobmine.ccol.uwaterloo.ca/psp/SS/; PS_LOGINLIST=https://jobmine.ccol.uwaterloo.ca/SS; PS_TOKEN=AAAApwECAwQAAQAAAAACvAAAAAAAAAAsAARTaGRyAgBOcQgAOAAuADEAMBSz+sZ9r08P9mxYTuiTGOpZ6yzBTwAAAGcABVNkYXRhW3icNYlLDkBAAEOfIZbiIsRnCFsTsZD4TCKWzuB+DqcW2vS1SYE7MGFEgGSejyk7jpkBzyrPMSMLU8LByaXPseEtFQUllkzdixW1WNKQa1nx3wUtndLzAqY0DBU=; SignOnDefault=QCKBROOK; HPTabName=DEFAULT; https%3a%2f%2fjobmine.ccol.uwaterloo.ca%2fpsp%2fss%2femployee%2fwork%2frefresh=list:%20; PS_TOKENEXPIRE=24_Sep_2014_00:49:09_GMT' -H 'Connection: keep-alive' --compressed

#download $id

count=10000

while read p; do
  echo $p
  count=$(($count-1))
  if [ "$count" -le 0 ]
  	then
  	break
  fi
  #download $p
  mv "$p.txt" "$p.html"
done <ids.txt