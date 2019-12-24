const radar = {
    "adopt": [
        {"name": "Scala",                     "tags": ["LG", "BE"],       "comments": ""},
        {"name": "Kamon",                     "tags": ["FW", "BE"],       "comments": ""},
        {"name": "Akka Http",                 "tags": ["FW", "BE"],       "comments": ""},
        {"name": "Play",                      "tags": ["FW", "BE"],       "comments": ""},
        {"name": "Kafka",                     "tags": ["DM", "BE", "BD"], "comments": ""},
        {"name": "Avro",                      "tags": ["DM", "BE", "BD"], "comments": ""},
        {"name": "Elasticsearch",             "tags": ["DM", "OP"],       "comments": ""},
        {"name": "Python",                    "tags": ["LG", "BE", "BD"], "comments": ""},
        {"name": "Jenkins",                   "tags": ["IF", "OP"],       "comments": ""},
        {"name": "Circle CI",                 "tags": ["IF", "OP"],       "comments": ""},
        {"name": "AMQP",                      "tags": ["DM", "BD"],       "comments": ""},
        {"name": "Marathon",                  "tags": ["IF", "OP"],       "comments": ""},
        {"name": "Heroku",                    "tags": ["IF", "OP"],       "comments": ""},
        {"name": "Grafana",                   "tags": ["DM", "OP"],       "comments": ""},
        {"name": "Prometheus",                "tags": ["DM", "OP"],       "comments": ""},
        {"name": "Docker",                    "tags": ["IF", "OP"],       "comments": ""},
        {"name": "Spark",                     "tags": ["FW", "BD"],       "comments": ""},
        {"name": "Kafka Streams",             "tags": ["FW", "BE", "BD"], "comments": ""},
        {"name": "Node (tooling)",            "tags": ["FW", "FE"],       "comments": ""},
        {"name": "Redux",                     "tags": ["FW", "FE"],       "comments": ""},
        {"name": "Webpack",                   "tags": ["FW", "FE"],       "comments": ""},
        {"name": "TypeScript",                "tags": ["LG", "FE"],       "comments": ""},
        {"name": "React",                     "tags": ["FW", "FE"],       "comments": ""},
        {"name": "Angular 2+",                "tags": ["FW", "FE"],       "comments": ""},
        {"name": "RxJS",                      "tags": ["FW", "FE"],       "comments": ""},
        {"name": "Flexbox",                   "tags": ["FW", "FE"],       "comments": ""},
    ],
    "trial": [
        {"name": "Kubernetes",                "tags": ["IF", "OP"],       "comments": ""},
        {"name": "Akka Typed",                "tags": ["FW", "BE"],       "comments": ""},
        {"name": "Dotty",                     "tags": ["LG", "BE"],       "comments": ""},
        {"name": "Kotlin",                    "tags": ["LG", "BE"],       "comments": ""},
        {"name": "AWS EKS",                   "tags": ["IF", "OP"],       "comments": ""},
        {"name": "AWS Lambda",                "tags": ["IF", "OP", "FE"], "comments": ""},
        {"name": "Serverless",                "tags": ["IF", "OP"],       "comments": ""},
        {"name": "Databricks",                "tags": ["FW", "BD"],       "comments": ""},
        {"name": "R",                         "tags": ["LG", "BD"],       "comments": ""},
        {"name": "PWA",                       "tags": ["FW", "FE"],       "comments": ""},
        {"name": "Vue",                       "tags": ["FW", "FE"],       "comments": ""},
        {"name": "MobX",                      "tags": ["FW", "FE"],       "comments": ""},
        {"name": "CycleJS",                   "tags": ["FW", "FE"],       "comments": ""},
        {"name": "FP in front-end",           "tags": ["LG", "FE"],       "comments": ""},
        {"name": "State Management",          "tags": ["FW", "FE"],       "comments": ""},
    ],
    "assess": [
        {"name": "Jooq",                      "tags": ["FW", "BE"],       "comments": ""},
        {"name": "GraalVM",                   "tags": ["LG", "BE"],       "comments": ""},
        {"name": "Jaeger",                    "tags": ["FW", "BE"],       "comments": ""},
        {"name": "Opentracing",               "tags": ["FW", "BE"],       "comments": ""},
        {"name": "InfluxDB",                  "tags": ["DM", "BE"],       "comments": ""},
        {"name": "Monix",                     "tags": ["FW", "BE"],       "comments": ""},
        {"name": "Lagom",                     "tags": ["FW", "BE"],       "comments": ""},
        {"name": "GraphQL",                   "tags": ["DM", "BE", "FE"], "comments": ""},
        {"name": "Reactor",                   "tags": ["FW", "BE"],       "comments": ""},
        {"name": "Spinnaker",                 "tags": ["DM", "OP"],       "comments": ""},
        {"name": "Istio",                     "tags": ["IF", "OP"],       "comments": ""},
        {"name": "Go",                        "tags": ["LG", "OP"],       "comments": ""},
        {"name": "gRPC",                      "tags": ["FW", "OP"],       "comments": ""},
        {"name": "Sematext",                  "tags": ["DM", "OP"],       "comments": ""},
        {"name": "Instana",                   "tags": ["DM", "OP"],       "comments": ""},
        {"name": "Azure",                     "tags": ["IF", "OP"],       "comments": ""},
        {"name": "Cassandra",                 "tags": ["DM", "BD"],       "comments": ""},
        {"name": "DynamoDB",                  "tags": ["DM", "BD"],       "comments": ""},
        {"name": "AWS EMR",                   "tags": ["IF", "BD"],       "comments": ""},
        {"name": "Hortonworks",               "tags": ["DM", "BD"],       "comments": ""},
        {"name": "Flink",                     "tags": ["FW", "BD"],       "comments": ""},
        {"name": "NiFi",                      "tags": ["DM", "BD"],       "comments": ""},
        {"name": "Airflow",                   "tags": ["DM", "BD"],       "comments": ""},
        {"name": "Google BigTable",           "tags": ["IF", "BD"],       "comments": ""},
        {"name": "Google BigQuery",           "tags": ["IF", "BD"],       "comments": ""},
        {"name": "AWS Step Functions",        "tags": ["IF", "BD"],       "comments": ""},
        {"name": "Zeppelin",                  "tags": ["FW", "BD"],       "comments": ""},
        {"name": "CSS Grid",                  "tags": ["FW", "FE"],       "comments": ""},
        {"name": "Firebase",                  "tags": ["FW", "FE"],       "comments": ""},
        {"name": "Styled components",         "tags": ["FW", "FE"],       "comments": ""},
        {"name": "Parcel Bundler",            "tags": ["FW", "FE"],       "comments": ""},
    ],
    "hold": [
        {"name": "Rust",                      "tags": ["LG", "BE"],       "comments": ""},
        {"name": "RxScala",                   "tags": ["FW", "BE"],       "comments": ""},
        {"name": "Java",                      "tags": ["LG", "BE"],       "comments": ""},
        {"name": "Haskell",                   "tags": ["LG", "BE"],       "comments": ""},
        {"name": "Perl",                      "tags": ["LG", "BE"],       "comments": ""},
        {"name": "Swift",                     "tags": ["LG", "BE"],       "comments": ""},
        {"name": "Blockchain",                "tags": ["FW", "BE"],       "comments": ""},
        {"name": "Ansible",                   "tags": ["FW", "OP"],       "comments": ""},
        {"name": "Chef",                      "tags": ["FW", "OP"],       "comments": ""},
        {"name": "Oozie",                     "tags": ["FW", "BD"],       "comments": ""},
        {"name": "Sqoop",                     "tags": ["FW", "BD"],       "comments": ""},
        {"name": "Storm",                     "tags": ["FW", "BD"],       "comments": ""},
        {"name": "TensorFlow",                "tags": ["FW", "BD"],       "comments": ""},
        {"name": "Lambda architecture",       "tags": ["FW", "BD"],       "comments": ""},
        {"name": "Clojure Script",            "tags": ["LG", "FE"],       "comments": ""},
        {"name": "Purescript",                "tags": ["LG", "FE"],       "comments": ""},
        {"name": "ScalaJS",                   "tags": ["LG", "FE"],       "comments": ""},
        {"name": "Kotlin (JS)",               "tags": ["LG", "FE"],       "comments": ""},
        {"name": "Plain ES6",                 "tags": ["LG", "FE"],       "comments": ""},
        {"name": "Node (back-end)",           "tags": ["FW", "FE"],       "comments": ""},
        {"name": "Angular 1",                 "tags": ["FW", "FE"],       "comments": ""},
        {"name": "React Native",              "tags": ["FW", "FE"],       "comments": ""},
        {"name": "Ionic 4",                   "tags": ["FW", "FE"],       "comments": ""},
        {"name": "Elm",                       "tags": ["LG", "FE"],       "comments": ""},
        {"name": "Web Assembly",              "tags": ["LG", "FE"],       "comments": ""},
        {"name": "Falcor",                    "tags": ["FW", "FE"],       "comments": ""},
        {"name": "WebVR",                     "tags": ["FW", "FE"],       "comments": ""},
    ],
    "unknown": [
        {"name": "Axon",                      "tags": ["FW", "BE"],       "comments": ""},
        {"name": "Micro-services",            "tags": ["FW", "BE"],       "comments": ""},
        {"name": "Slick",                     "tags": ["FW", "BE"],       "comments": ""},
        {"name": "Postgres",                  "tags": ["DM", "BE"],       "comments": ""},
        {"name": "ELK Stack",                 "tags": ["DM", "OP"],       "comments": ""},
        {"name": "Slick alternatives?",       "tags": ["DM", "OP"],       "comments": ""},
        {"name": "SASS",                      "tags": ["LG", "FE"],       "comments": ""},
        {"name": "Visual Studio",             "tags": ["FW", "FE"],       "comments": ""},
        {"name": "D3",                        "tags": ["FW", "FE"],       "comments": ""},
        {"name": "Reason",                    "tags": ["FW", "FE"],       "comments": ""},
        {"name": "Static Site Generators",    "tags": ["FW", "FE"],       "comments": ""},
        {"name": "Hyper App",                 "tags": ["FW", "FE"],       "comments": ""},
        {"name": "Cypress",                   "tags": ["FW", "FE"],       "comments": ""},
        {"name": "Front-end DevOps",          "tags": ["FW", "FE"],       "comments": ""},
        {"name": "Bootstrap",                 "tags": ["FW", "FE"],       "comments": ""},
        {"name": "Web Components",            "tags": ["FW", "FE"],       "comments": ""},
        {"name": "Polymer 3",                 "tags": ["FW", "FE"],       "comments": ""},
    ]
};

const rings = [
  { name: "ADOPT", color: "#93c47d" },
  { name: "TRIAL", color: "#93d2c2" },
  { name: "ASSESS", color: "#fbdb84" },
  { name: "HOLD", color: "#efafa9" }
];

const radarRemapped = Object
  .keys(radar)
  .filter(k => k !== "unknown")
  .reduce((accu, k) =>
      accu.concat(radar[k].map(e =>
          Object.assign({}, e, {ring: rings.findIndex(r => r.name.toLowerCase() === k)}))
      ), []
  );
  // .flatMap(k => radar[k].map(e => {quadrant: k, ...e}));

function toEntries(rawEntries, quadrantCallback) {
  return rawEntries
    .map(entry => {
      return {
        quadrant: quadrantCallback(entry.tags),
        ring: entry.ring,
        label: entry.name,
        active: false,
        link: null,
        moved: 0
    }});
}

const mainCategory = (tags) => {
  return {
    "LG": 0,
    "IF": 1,
    "FW": 2,
    "DM": 3,
  }[tags[0]];
};

const altCategory = (tags) => {
  return {
    "BD": 0,
    "OP": 1,
    "BE": 2,
    "FE": 3,
  }[tags[1]];
};

radar_visualization({
  svg_id: "radar1",
  width: 1450,
  height: 1000,
  colors: {
    background: "#333",
    grid: "#aaa",
    inactive: "#ddd"
  },
  title: "Codestar Tech Radar — 2018.07",
  quadrants: [
    { name: "Languages" },
    { name: "Infrastructure" },
    { name: "Frameworks" },
    { name: "Data Management" }
  ],
  rings: rings,
  print_layout: true,
  entries: toEntries(radarRemapped, mainCategory)
});

radar_visualization({
  svg_id: "radar2",
  width: 1450,
  height: 1000,
  colors: {
    background: "#333",
    grid: "#aaa",
    inactive: "#ddd"
  },
  title: "Codestar Tech Radar — 2018.07",
  quadrants: [
    { name: "Big Data" },
    { name: "Operations" },
    { name: "Back-end" },
    { name: "Front-end" }
  ],
  rings: rings,
  print_layout: true,
  entries: toEntries(radarRemapped, altCategory)
});
