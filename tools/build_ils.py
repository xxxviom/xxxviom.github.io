#!/usr/bin/env python3
"""Build ils.js (approach category per runway end) from X-Plane navdata earth_nav.dat.
Usage: python3 tools/build_ils.py path/to/earth_nav.dat > ils.js
Record codes 4 (ILS/LOC with GS) and 5 (LOC only); name field: ILS-cat-I/II/III, LOC, LDA, SDF."""
import sys,json
RANK={"CAT I":1,"CAT II":2,"CAT III":3}
def label(name):
    n=name.upper()
    if "ILS-CAT-III" in n: return "CAT III"
    if "ILS-CAT-II" in n: return "CAT II"
    if "ILS-CAT-I" in n: return "CAT I"
    if n.startswith("LOC"): return "LOC"
    if n.startswith("LDA"): return "LDA"
    if n.startswith("SDF"): return "SDF"
    return None
out={}
for ln in open(sys.argv[1],encoding="utf-8",errors="ignore"):
    t=ln.split()
    if len(t)<11 or t[0] not in("4","5"): continue
    ic,rw,lab=t[8],t[9],label(" ".join(t[10:]))
    if not lab: continue
    cur=out.setdefault(ic,{}).get(rw)
    if cur is None or RANK.get(lab,0)>RANK.get(cur,0): out[ic][rw]=lab
print("window.ILS="+json.dumps(out,separators=(",",":"))+";")
