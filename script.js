/*
  EDITABLE CONNECTION DESCRIPTIONS
  Change the text in CONNECTIONS below if you want to revise a line label.
  Keep each id the same as the matching SVG line id in index.html.
*/
const CONNECTIONS = [
  { id: "line-china-standards", nodes: ["china", "standards"], label: "Industry participation and standards contributions" },
  { id: "line-standards-suppliers", nodes: ["standards", "suppliers"], label: "Technical specifications and interoperability standards shape equipment requirements" },
  { id: "line-china-suppliers", nodes: ["china", "suppliers"], label: "China's domestic industry supplies 5G equipment" },
  { id: "line-us-suppliers", nodes: ["us", "suppliers"], label: "This can affect what technologies companies can obtain or supply" },
  { id: "line-suppliers-operators", nodes: ["suppliers", "operators"], label: "Equipment sales and procurement" },
  { id: "line-eu-operators", nodes: ["eu", "operators"], label: "Rules can limit which vendors operators may use" },
  { id: "line-operators-infrastructure", nodes: ["operators", "infrastructure"], label: "Investment and deployment" },

  // Main system -> feedback-loop OUTER BOXES. These do not connect to internal loop nodes.
  { id: "line-us-loop-one", nodes: ["us", "loop1"], label: "May affect supplier availability" },
  { id: "line-operators-loop-one", nodes: ["operators", "loop1"], label: "Procurement choices" },
  { id: "line-infrastructure-loop-one", nodes: ["infrastructure", "loop1"], label: "Installed networks" },
  { id: "line-eu-loop-two", nodes: ["eu", "loop2"], label: "Restrictions on installed equipment" },
  { id: "line-infrastructure-loop-two", nodes: ["infrastructure", "loop2"], label: "Existing infrastructure" },

  // Dotted arrows are possible or indirect effects, not guaranteed outcomes.
  { id: "line-eu-consequences", nodes: ["eu", "consequences"], label: "Different national policies can complicate coordination" },
  { id: "line-operators-consequences", nodes: ["operators", "consequences"], label: "Replacement costs may affect upgrades" },
  { id: "line-infrastructure-consequences", nodes: ["infrastructure", "consequences"], label: "Potentially slower upgrades" },

  // Feedback loop 1: supplier diversification.
  { id: "line-loop1-a", nodes: ["loop1"], label: "Supplier restrictions" },
  { id: "line-loop1-b", nodes: ["loop1"], label: "Alternative vendors considered" },
  { id: "line-loop1-c", nodes: ["loop1"], label: "Influences future vendor choices" },

  // Feedback loop 2: replacement costs.
  { id: "line-loop2-a", nodes: ["loop2"], label: "Restrictions on installed equipment" },
  { id: "line-loop2-b", nodes: ["loop2"], label: "Replacement costs" },
  { id: "line-loop2-c", nodes: ["loop2"], label: "Influences implementation timeline" }
];

const NODE_INFO = {
  standards: {
    title: "International standards · 3GPP and ITU",
    description: "3GPP develops detailed 5G technical specifications; ITU defines the international IMT-2020 framework.",
    connections: ["Technical specifications shape equipment requirements.", "Standards support interoperability between network equipment."]
  },
  china: {
    title: "China · 5G industry participation",
    description: "Chinese firms, including Huawei and ZTE, participate in the 5G industry and international standards work.",
    connections: ["Industry participation and standards contributions.", "China-based suppliers provide 5G equipment."]
  },
  us: {
    title: "United States · Export controls and restrictions",
    description: "U.S. export controls can restrict access to U.S.-controlled technologies and certain foreign-produced items.",
    connections: ["Can affect what technologies companies can obtain or supply.", "Connects to the supplier-diversification feedback loop as policy may change supplier availability."]
  },
  suppliers: {
    title: "Equipment suppliers · Huawei, ZTE and others",
    description: "Equipment suppliers provide network equipment that telecom operators procure and deploy.",
    connections: ["Standards shape technical requirements.", "Operators buy equipment from suppliers.", "Export controls can affect access to certain technologies."]
  },
  eu: {
    title: "EU / Member States · Supplier security rules",
    description: "EU 5G policy assesses supplier security risks; Member States have responsibilities for national security and implementation.",
    connections: ["Rules can limit which vendors operators may use.", "Links to feedback loop 1: supplier restrictions may prompt consideration of alternative vendors.", "Links to feedback loop 2: restrictions on installed equipment may create replacement costs.", "Different national approaches can complicate coordination."]
  },
  operators: {
    title: "Telecom operators · Procurement",
    description: "Telecom operators choose equipment suppliers, invest in deployment and operate the resulting networks.",
    connections: ["Procure equipment from suppliers.", "Invest in and deploy 5G infrastructure.", "Procurement choices connect to feedback loop 1.", "Existing networks connect to feedback loop 2 and possible upgrade pressures."]
  },
  infrastructure: {
    title: "5G infrastructure · Installed equipment and operating networks",
    description: "This represents the installed equipment and operating networks created through operator investment and deployment.",
    connections: ["Built through investment and deployment.", "Installed equipment may be affected by later restrictions.", "Replacement costs may affect upgrade timelines."]
  },
  loop1: {
    title: "Feedback loop 1 · Supplier diversification",
    description: "Supplier restrictions may lead operators to consider alternatives. Changes in the supplier mix can influence future procurement choices.",
    connections: ["Supplier restrictions → alternative vendors considered → supplier dependence changes → influences future vendor choices."]
  },
  restrictions: {
    title: "Supplier restrictions",
    description: "Policy restrictions can change which vendors operators may use or consider.",
    connections: ["Part of feedback loop 1: supplier restrictions → alternative vendors considered → supplier dependence changes."]
  },
  alternatives: {
    title: "Alternative vendors considered",
    description: "Operators may consider alternative vendors in response to supplier restrictions.",
    connections: ["Part of feedback loop 1; any change in supplier dependence may influence future procurement."]
  },
  dependence: {
    title: "Supplier dependence changes",
    description: "Procurement choices can change how dependent operators are on particular suppliers.",
    connections: ["Part of feedback loop 1: the changed supplier mix can influence future vendor choices."]
  },
  loop2: {
    title: "Feedback loop 2 · Replacement costs",
    description: "Restrictions on installed equipment may create replacement costs, which can put pressure on the timing or phasing of implementation.",
    connections: ["Restrictions on installed equipment → replacement costs → pressure for phased implementation → influences implementation timeline."]
  },
  installed: {
    title: "Restrictions on installed equipment",
    description: "If restrictions apply to equipment already installed, operators may need to replace some equipment.",
    connections: ["Part of feedback loop 2: restrictions → replacement costs → pressure for phased implementation."]
  },
  replacement: {
    title: "Replacement costs",
    description: "Replacing installed equipment may involve additional costs and operational complexity.",
    connections: ["Part of feedback loop 2; cost pressures may encourage phased implementation."]
  },
  phased: {
    title: "Pressure for phased implementation",
    description: "Operators and policymakers may face pressure to phase implementation to manage replacement costs and disruption.",
    connections: ["Part of feedback loop 2; implementation timing can feed back into how restrictions are carried out."]
  },
  consequences: {
    title: "Potential unintended consequences",
    description: "These are plausible risks, not guaranteed results: replacement costs may rise, some upgrades may slow, and differing national policies may complicate coordination.",
    connections: ["Dotted links indicate possible or indirect consequences.", "The map does not claim that every restriction will delay rollout."]
  }
};

const svg = document.getElementById("systemsMap");
const nodes = [...svg.querySelectorAll(".node")];
const lines = [...svg.querySelectorAll(".connection")];
const labels = [...svg.querySelectorAll(".connection-label")];
const selectedTitle = document.getElementById("selectedTitle");
const selectedDescription = document.getElementById("selectedDescription");
const connectionDescriptions = document.getElementById("connectionDescriptions");
const mapStatus = document.getElementById("mapStatus");

function hideAllConnections() {
  lines.forEach(line => line.classList.remove("visible"));
  labels.forEach(label => label.classList.remove("visible"));
  nodes.forEach(node => node.classList.remove("selected"));
}

function showConnection(id) {
  const line = document.getElementById(id);
  if (line) line.classList.add("visible");
  labels.filter(label => label.dataset.line === id)
    .forEach(label => label.classList.add("visible"));
}

function showConnectionsFor(nodeId) {
  // Clicking a main-system node reveals its directly connected lines.
  CONNECTIONS
    .filter(connection => connection.nodes.includes(nodeId))
    .forEach(connection => showConnection(connection.id));

  // A main node linked to a feedback loop reveals the loop's internal sequence too.
  if (["us", "operators", "infrastructure", "eu", "loop1", "restrictions", "alternatives", "dependence"].includes(nodeId)) {
    CONNECTIONS.filter(connection => connection.nodes.includes("loop1"))
      .forEach(connection => showConnection(connection.id));
  }
  if (["eu", "infrastructure", "loop2", "installed", "replacement", "phased"].includes(nodeId)) {
    CONNECTIONS.filter(connection => connection.nodes.includes("loop2"))
      .forEach(connection => showConnection(connection.id));
  }
}

function selectNode(nodeId) {
  hideAllConnections();
  const node = nodes.find(item => item.dataset.node === nodeId);
  const info = NODE_INFO[nodeId];
  if (!node || !info) return;

  node.classList.add("selected");
  showConnectionsFor(nodeId);

  selectedTitle.textContent = info.title;
  selectedDescription.textContent = info.description;
  connectionDescriptions.replaceChildren();
  info.connections.forEach(description => {
    const item = document.createElement("li");
    item.textContent = description;
    connectionDescriptions.appendChild(item);
  });
  mapStatus.textContent = `Showing pathways connected to: ${info.title}`;
}

function showAllConnections() {
  hideAllConnections();
  lines.forEach(line => line.classList.add("visible"));
  labels.forEach(label => label.classList.add("visible"));
  selectedTitle.textContent = "All pathways";
  selectedDescription.textContent = "The full system is visible. Select any node to focus on its connected relationships.";
  connectionDescriptions.replaceChildren();
  mapStatus.textContent = "All pathways visible";
}

function resetMap() {
  hideAllConnections();
  selectedTitle.textContent = "None selected";
  selectedDescription.textContent = "Select a node such as EU / Member States or Telecom operators.";
  connectionDescriptions.replaceChildren();
  mapStatus.textContent = "Select a node · pathways hidden";
}

nodes.forEach(node => {
  node.addEventListener("click", () => selectNode(node.dataset.node));
  node.addEventListener("keydown", event => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      selectNode(node.dataset.node);
    }
  });
});

document.getElementById("resetButton").addEventListener("click", resetMap);
document.getElementById("showAllButton").addEventListener("click", showAllConnections);
