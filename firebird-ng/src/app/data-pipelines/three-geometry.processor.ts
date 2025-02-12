import * as THREE from "three";
import {wildCardCheck} from "../utils/wildcard";
import {CalorimetryGeometryPrettifier} from "./calorimetry.prettifier";
import {editThreeNodeContent, EditThreeNodeRule} from "../utils/three-geometry-editor";
import {Subdetector} from "../model/subdetector";

/**
 * A typed object that associates a name (or multiple names) with an array of edit rules.
 * E.g. { name: "DIRC_14", rules: [ { patterns: [...], ... } ] }
 */
export interface DetectorThreeRuleSet {
  names?: string[];
  name?: string;
  rules: EditThreeNodeRule[];
}

/**
 * Converts a raw JSON/JSONC array into typed DetectorThreeRuleSet objects.
 * If an EditThreeNodeRule has "materialJson", we parse it using THREE.MaterialLoader.
 */
export function ruleSetsFromObj(obj: any): DetectorThreeRuleSet[] {
  // Not an array => return empty
  if (!Array.isArray(obj)) {
    console.warn('ruleSetsFromObj: top-level object is not an array. Returning empty.');
    return [];
  }

  // Create a single MaterialLoader we can reuse for all materialJson objects
  const materialLoader = new THREE.MaterialLoader();

  return obj.map((item: any) => {
    // Ensure we have a rules array
    if (!item.rules || !Array.isArray(item.rules)) {
      console.warn('ruleSetsFromObj: missing or invalid "rules" array in item:', item);
      return { rules: [] };
    }

    // Convert each rule
    const convertedRules: EditThreeNodeRule[] = item.rules.map((r: any) => {
      const rule: EditThreeNodeRule = { ...r };

      // 1) Convert a color from string hex "0xabcdef" => number
      if (typeof rule.color === 'string') {
        rule.color = parseInt(rule.color, 16);
      }

      // 2) If there's "materialJson", parse it using THREE.MaterialLoader
      if (r.materialJson && typeof r.materialJson === 'object') {
        try {
          // Convert raw JSON to real material
          const loadedMaterial = materialLoader.parse(r.materialJson);
          rule.material = loadedMaterial;
        } catch (err) {
          console.error('Failed to parse materialJson:', err, r.materialJson);
        }
      }

      return rule;
    });

    return {
      names: item.names,
      name: item.name,
      rules: convertedRules,
    };
  });
}


/**
 * Matches which set of rules should be applied to which detectors
 *
 * - Detectors are matched based on their `sourceGeometryName` against the names specified in the rulesets.
 * - Rule lists are matched to detectors in the order they appear in the rulesets
 * - Once a rule is applied to a detector, that detector is excluded from further rule matching, ensuring each detector is processed only once.
 * - If both `names` and `name` are provided in a ruleset, the function treats it as a user error in JSON rule editing but processes both without raising an exception.
 * - If a ruleset contains a wildcard name (`"*"`), it will apply its rules to any detectors not already matched by previous rulesets. So it should be placed in
 *
 * @param {Subdetector[]} detectors - The list of detectors to which the rules will be applied.
 * @param {DetectorThreeRuleSet[]} ruleSets - The set of rules to be applied, processed sequentially.
 * @return {Map<Subdetector, EditThreeNodeRule[]>} - A map associating each detector with an array of the rules applied to it.
 */
export function matchRulesToDetectors(ruleSets: DetectorThreeRuleSet[], detectors: Subdetector[]): Map<Subdetector, EditThreeNodeRule[]> {
  const unassignedDetectors = new Set(detectors);
  const detectorRulesMap = new Map<Subdetector, EditThreeNodeRule[]>();

  for(let ruleSet of ruleSets) {
    const targets = new Set<Subdetector>();
    let names = new Set<string>(ruleSet.names || []);

    // Handle possible user error where both 'name' and 'names' are provided.
    if (ruleSet.name) {
      names.add(ruleSet.name);
    }

    for(let name of names) {
      for(let det of unassignedDetectors) {
        if (wildCardCheck(det.sourceGeometryName, name)) {
          targets.add(det);
          detectorRulesMap.set(det, ruleSet.rules || []);
          unassignedDetectors.delete(det);  // Move deletion here to optimize
        }
      }
    }
  }

  return detectorRulesMap;
}

export class ThreeGeometryProcessor {

  rules: DetectorThreeRuleSet[] = [
    {
      names: ["FluxBarrel_env_25", "FluxEndcapP_26", "FluxEndcapN_28"],
      rules: [
        {
          color: 0x373766,

        }
      ]
    },
    {
      name: "EcalEndcapN*",
      rules: [
        {
          patterns: ["**/crystal_vol_0"],
          color: 0xffef8b,
          material: new THREE.MeshStandardMaterial({
            color: 0xffef8b,
            roughness: 0.7,
            metalness: 0.869,
            transparent: true,
            opacity: 0.8,
            side: THREE.DoubleSide
          })
        },
        {
          patterns: ["**/inner_support*", "**/ring*"],
          material: new THREE.MeshStandardMaterial({
            color: 0x19a5f5,
            roughness: 0.7,
            metalness: 0.869,
            transparent: true,
            opacity: 0.8,
            side: THREE.DoubleSide
          })
        }

      ]
    },
    {
      name: "InnerTrackerSupport_assembly_13",
      rules: [
        {
          material: new THREE.MeshStandardMaterial({
            color: 0xEEEEEE,
            roughness: 0.7,
            metalness: 0.3,
            transparent: true,
            opacity: 0.8,
            blending: THREE.NormalBlending,
            // premultipliedAlpha: true,
            depthWrite: false, // Ensures correct blending
            polygonOffset: true,
            polygonOffsetFactor: 1,
            side: THREE.DoubleSide
          }),
          outline: true,
          outlineColor: 0x666666,
          merge: true,
          newName: "InnerTrackerSupport"
        }
      ]
    },
    {
      name: "DIRC_14",
      rules: [
        {
          patterns:     ["**/*box*", "**/*prism*"],
          material: new THREE.MeshPhysicalMaterial({
            color: 0xe5ba5d,
            metalness: .9,
            roughness: .05,
            envMapIntensity: 0.9,
            clearcoat: 1,
            transparent: true,
            //transmission: .60,
            opacity: .6,
            reflectivity: 0.2,
            //refr: 0.985,
            ior: 0.9,
            side: THREE.DoubleSide,
          }),
          newName: "DIRC_barAndPrisms"
        },
        {
          patterns: ["**/*rail*"],
          newName: "DIRC_rails",
          color: 0xAAAACC
        },
        {
          patterns: ["**/*mcp*"],
          newName: "DIRC_mcps"
        }
      ]

    },
    {
      name: "VertexBarrelSubAssembly_3",
      rules: [
        {
          merge: true,
          outline: true
        }
      ]
    },
    {
      name: "*",
      rules: [
        {
          merge: true,
          outline: true
        }
      ]
    }
  ]

  calorimetry = new CalorimetryGeometryPrettifier();



  glassMaterial = new THREE.LineBasicMaterial( {
    color: 0xf1f1f1,
    linewidth: 1,
    linecap: 'round', //ignored by WebGLRenderer
    linejoin:  'round' //ignored by WebGLRenderer
  } );



  params = {
    alpha: 0.5,
    alphaHash: true,
    taa: true,
    sampleLevel: 2,
  };

  vertexShader = `
    varying vec2 vUv;
    void main()	{
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
    }
  `;
  fragmentShader = `
		//#extension GL_OES_standard_derivatives : enable

    varying vec2 vUv;
    uniform float thickness;

    float edgeFactor(vec2 p){
    	vec2 grid = abs(fract(p - 0.5) - 0.5) / fwidth(p) / thickness;
  		return min(grid.x, grid.y);
    }

    void main() {

      float a = edgeFactor(vUv);

      vec3 c = mix(vec3(1), vec3(0), a);

      gl_FragColor = vec4(c, 1.0);
    }
  `;

  shaderMaterial: THREE.ShaderMaterial;

  alphaMaterial = new THREE.MeshStandardMaterial( {
    color: 0xffffff,
    alphaHash: this.params.alphaHash,
    opacity: this.params.alpha
  } );



  // new MeshPhysicalMaterial({
  //   color: 0xffff00, // Yellow color
  //   metalness: 0,
  //   roughness: 0,
  //   transmission: 0.7, // High transparency
  //   opacity: 1,
  //   transparent: true,
  //   reflectivity: 0.5
  // });

  constructor() {
    this.shaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        thickness: {
          value: 1.5
        }
      },
      vertexShader: this.vertexShader,
      fragmentShader: this.fragmentShader
    });
  }

  public process(detectors: Subdetector[]) {
    this.processRuleSets(this.rules, detectors);
  }

  public processRuleSets(ruleSets: DetectorThreeRuleSet[], detectors: Subdetector[]) {
    let detRulesMap = matchRulesToDetectors(ruleSets, detectors);
    for (let [detector, ruleSet] of detRulesMap) {
      for(let rule of ruleSet) {
        editThreeNodeContent(detector.geometry, rule);
      }
    }
  }
}
