import uproot

file = uproot.open("root://dtn-eic.jlab.org//work/eic2/EPIC/RECO/24.08.1/epic_craterlake/DIS/CC/5x41/minQ2=100/pythia8CCDIS_5x41_minQ2=100_beamEffects_xAngle=-0.025_hiDiv_1.0000.eicrecon.tree.edm4eic.root")
print(file.keys())