// Facts come from the owner's project documents and conversations. No fictional projects,
// dates, client testimonials, or credentials. Capacity is owner-reported, not daily usage.
export const site = {
  name: 'Muhammad Usama Aslam', shortName: 'Usama Aslam',
  role: 'AI systems & inference engineer',
  url: 'https://theusamaaslam.github.io',
  description: 'Usama Aslam builds production AI systems, from conversational agents and knowledge retrieval to model inference and the infrastructure underneath.',
  github: 'https://github.com/theusamaaslam',
  linkedin: 'https://www.linkedin.com/in/theusamaaslam/',
  email: 'usamaaslam081@gmail.com',
};
export type Project = {
  slug: string; title: string; category: 'Agents' | 'Platforms' | 'Intelligence';
  label: string; summary: string; context: string; approach: string;
  outcome: string; notes: [string, string][]; stack: string[];
  scope: string; cover: string; color: string; link?: string; linkLabel?: string;
  metrics?: { value: string; label: string }[];
  features?: string[];
};
export const projects: Project[] = [
  {
    slug: 'customer-support', title: 'An answer is only the beginning.', category: 'Agents',
    label: 'Nayatel customer support', cover: 'support', color: 'sage',
    summary: 'AI customer support built for up to 500,000 queries per day, with backend actions, human handover, and a central dashboard.',
    scope: 'Collaborative engineering · Nayatel',
    context: 'Nayatel’s customers need support that understands their account, answers service questions, and helps resolve real issues. Support teams need the same conversation context, a central view of activity, and control over when an agent takes over.',
    approach: 'My team and I built a WhatsApp AI support system connected to organizational knowledge, customer backends, and an omnichannel operations platform. It combines account and billing checks, troubleshooting, service requests, and automated follow-ups with a central dashboard for conversations, queues, assignment, and human handover.',
    outcome: 'A production customer-support platform for Nayatel with capacity of up to 500,000 queries per day. AI assistance and human operations share a central dashboard, with connected workflows for customer checks, troubleshooting, backend actions, and human handover.',
    metrics: [{value:'500,000',label:'Queries per day · up to'},{value:'AI + human',label:'Connected support workflow'},{value:'Central dashboard',label:'Conversations, queues & assignment'}],
    features: ['WhatsApp customer support', 'Account and billing checks', 'Customer-issue troubleshooting', 'Knowledge-base answers', 'Backend service actions', 'Human-agent handover', 'Department routing and queues', 'Central support dashboard', 'Conversation assignment', 'Automated follow-ups'],
    notes: [
      ['Support that can take action', 'The assistant connects knowledge retrieval with customer-account checks and backend operations, helping customers move from a question toward a resolution.'],
      ['A connected human handover', 'Department routing, queues, and assignment connect automated support to the right team. Agents continue from the conversation context through the central dashboard.'],
      ['Operations in one place', 'The omnichannel platform brings conversations, handovers, and follow-ups into a shared workflow, giving support teams visibility beyond the model’s response.'],
    ], stack: ['Python', 'RAG', 'WhatsApp', 'Backend tools', 'Omnichannel support'],
  },
  {
    slug: 'naya-voice', title: 'Voice support that can act.', category: 'Agents',
    label: 'NayaVoice', cover: 'voice', color: 'dark',
    summary: 'A real-time voice AI platform that checks customer accounts, troubleshoots service issues, and acts through connected MCP tools.',
    scope: 'Voice-agent architecture & reliability · Nayatel',
    context: 'A customer calling about a real service issue needs more than a scripted response. The voice agent must verify context, check live information, follow a troubleshooting workflow, and connect the caller to a person when needed.',
    approach: 'NayaVoice combines SIP telephony and LiveKit audio with configurable agent workflows, knowledge retrieval, and MCP connectivity to customer systems. Agents can check account information, investigate customer issues, and invoke backend tools while structured state carries verification, facts, and actions across the call.',
    outcome: 'A voice-agent platform for customer-service workflows, with live backend connectivity, real-time logging, call transcripts, recordings, and human transfer. Context and cost controls support longer conversations without repeatedly asking for the same information.',
    features: ['Real-time voice conversations', 'Customer-account checks', 'Service-issue troubleshooting', 'MCP connectivity to backend tools', 'Knowledge-base retrieval', 'Configurable agent workflows', 'Real-time logs and call tracing', 'Transcripts and call recordings', 'Human-agent call transfer', 'Context and cost management'],
    notes: [
      ['Troubleshooting through real tools', 'MCP connections let the agent check live customer information and use backend operations as part of a guided troubleshooting conversation.'],
      ['Continuity across the call', 'Scoped prompts, tool sets, summaries, and structured call state preserve relevant facts as the conversation moves between workflow steps.'],
      ['See what happened in real time', 'Logs, tool activity, transcripts, and recordings help operators follow a call and investigate what the agent checked, said, or attempted.'],
    ], stack: ['LiveKit', 'Python', 'Gemini', 'MCP', 'LightRAG', 'SIP'],
  },
  {
    slug: 'nayacode', title: 'One AI harness. Across the organization.', category: 'Platforms',
    label: 'NayaCode', cover: 'code', color: 'peach',
    summary: 'An organization-wide AI harness connecting models, enterprise tools, browser workflows, and project context in one desktop workspace.',
    scope: 'Product engineering & desktop delivery · Nayatel',
    context: 'Teams need a practical way to use AI with the models, projects, and tools their organization already relies on. A shared AI harness brings those capabilities into a consistent workspace for engineering and broader organizational workflows.',
    approach: 'NayaCode brings Nayatel’s model gateway, MCP integrations, browser tools, and project-aware agent workflows into a Windows desktop application. Guided connections to tools such as Jira and GitHub extend the agent beyond chat, while protected credentials and a consistent installation experience support organizational use.',
    outcome: 'A desktop AI harness designed for organization-wide use, combining model choice, enterprise-tool connectivity, browser automation, and interactive outputs. Windows releases and the continuing V2 effort turn those capabilities into an installable product.',
    features: ['Organization-wide AI workspace', 'Multiple models through LiteLLM', 'Guided MCP integrations', 'Jira and GitHub connectivity', 'Browser tools and automation', 'Project-aware conversations', 'Context continuity through tool calls', 'Protected provider credentials', 'Interactive charts and tables', 'Windows installers and updates'],
    notes: [
      ['One workspace, connected capabilities', 'Shared model access and MCP connections bring organization tools into the same agent workflow instead of isolating AI in a separate chat window.'],
      ['From a request to useful output', 'Browser actions, tool calls, charts, and tables let teams work with information and carry a request through multiple steps.'],
      ['Built for desktop delivery', 'Protected credentials, consistent branding, installers, and release updates make deployment and everyday use part of the product.'],
    ], stack: ['Electron', 'TypeScript', 'LiteLLM', 'MCP', 'Windows'],
  },
  {
    slug: 'atlas-agent', title: 'An agent that remembers the work.', category: 'Agents',
    label: 'Atlas Agent', cover: 'memory', color: 'lavender',
    summary: 'A personal agent framework built around persistent memory, evidence-backed recall, skills, and multiple execution environments.',
    scope: 'Agent framework · Personal project',
    context: 'Useful long-running assistance depends on more than the current context window. Decisions change, projects evolve, and old conversation fragments need evidence and a sense of time.',
    approach: 'Atlas Agent organizes conversations into episodes, entities, versioned claims, and evolving dossiers. Its documented design recalls a semantic overview first, with source sessions retained as evidence and fallback.',
    outcome: 'An open-source agent project with a terminal interface, model-provider flexibility, an explorable memory graph, skills, scheduled work, and multiple execution backends. The repository documents the current implementation and setup.',
    notes: [
      ['Memory has provenance', 'Claims connect back to their evidence, making recall more useful than a pile of disconnected summaries.'],
      ['Current and historical state', 'Versioned claims and evolving dossiers distinguish what is known now from what was true earlier.'],
      ['Work beyond one terminal', 'The framework includes gateway integrations and execution options across local, container, SSH, and remote environments.'],
    ], stack: ['Python', 'Agent memory', 'Knowledge graphs', 'CLI', 'Tool orchestration'],
    link: 'https://github.com/theusamaaslam/AtlasAgent', linkLabel: 'View Atlas Agent on GitHub',
  },
  {
    slug: 'codegraph', title: 'Give agents a map of the code.', category: 'Platforms',
    label: 'CodeGraph platform', cover: 'graph', color: 'sage',
    summary: 'A hosted control plane for multi-project code intelligence, exposed to AI agents through remote MCP.',
    scope: 'Platform engineering',
    context: 'A local code graph helps an agent follow symbols and relationships. Sharing that intelligence across projects introduces a second set of problems: ingestion, synchronization, permissions, jobs, and auditability.',
    approach: 'The platform extends the CodeGraph engine with a project registry, repository ingestion, indexing jobs, GitHub synchronization, and remote MCP access. Users, teams, service accounts, and API keys provide project-level access control.',
    outcome: 'A documented platform architecture and implementation separating code intelligence from its control plane, with per-project graphs and an API for agent access.',
    notes: [
      ['Separate the engine and control plane', 'CodeGraph handles code relationships; the platform handles who can access each project and how its source stays current.'],
      ['Indexing is a lifecycle', 'Repository synchronization, index revisions, job retries, and error state make freshness explicit.'],
      ['Access follows the project', 'Project-level grants and authenticated MCP access support shared use without treating every indexed repository as equally accessible.'],
    ], stack: ['TypeScript', 'Fastify', 'PostgreSQL', 'MCP', 'Docker'],
  },
  {
    slug: 'urdu-speech', title: 'Ghalib. A voice built for Urdu.', category: 'Intelligence',
    label: 'Ghalib', cover: 'speech', color: 'sand',
    summary: 'My Urdu text-to-speech model and inference package, with native audio streaming, expressive voice styles, and built-in pronunciation processing.',
    scope: 'Model development & speech systems',
    context: 'Urdu customer conversations mix ordinary language with account details, numbers, and English technical terms. A useful speech system needs a consistent voice, control over tone, and an inference path that can deliver audio to a live conversation.',
    approach: 'I built Ghalib as an Urdu speech model and inference package. Its Hugging Face release bundles the model weights, tokenizer, vocoder, speaker encoder, voice-style references, runtime, and pronunciation processor. Python and HTTP interfaces support complete WAV output or native incremental audio streaming.',
    outcome: 'Ghalib produces mono 48 kHz speech with firm, neutral, warm, and empathetic styles. Its runtime supports native streaming, pronunciation-dictionary updates, bounded request admission, and isolated model workers. LiveKit integration reframes the streamed PCM into audio frames for conversational playback.',
    metrics: [{value:'48 kHz',label:'Mono speech output'},{value:'4 styles',label:'Firm · neutral · warm · empathetic'},{value:'Native streaming',label:'Incremental audio from one session'}],
    features: ['Urdu text-to-speech model', 'Native incremental audio streaming', 'Four bundled voice styles', 'Automatic pronunciation processing', 'Technical-word and number normalization', 'Python inference API', 'HTTP speech endpoint', 'WAV and 16-bit PCM output', 'Isolated parallel model workers', 'LiveKit audio integration'],
    notes: [
      ['Stream one acoustic session', 'The full text is supplied once, then audio is emitted incrementally. This preserves one synthesis session rather than joining separately generated phrases.'],
      ['Pronunciation lives in the package', 'A bundled dictionary processes approved technical terms, numbers, and punctuation while preserving ordinary Urdu script. Changes are validated and picked up by the processor.'],
      ['Connect the model to the conversation', 'The runtime produces 48 kHz mono audio. Streaming PCM can be reframed into 20 ms LiveKit frames, while isolated model workers and bounded queues make concurrent inference explicit.'],
    ], stack: ['Ghalib', 'Urdu TTS', 'PyTorch', 'Native streaming', 'LiveKit'],
    link: 'https://huggingface.co/theusamaaslam/ghalib', linkLabel: 'View Ghalib on Hugging Face',
  },
  {
    slug: 'customer-intelligence', title: 'Customer signals, made useful.', category: 'Intelligence',
    label: 'CSI dashboard & customer intelligence', cover: 'analytics', color: 'peach',
    summary: 'A database-backed Customer Service Index dashboard with customer drill-downs and on-demand AI analysis.',
    scope: 'Analytics engineering · Nayatel',
    context: 'Customer-service data becomes more actionable when teams can move from an overall trend to the customer records behind it, without losing the relationship between the two.',
    approach: 'The CSI dashboard combines score categories, trends, KPI summaries, and customer filtering in Dash and Plotly. A separate calculation pipeline prepares scores, while Groq powers on-demand analysis.',
    outcome: 'A dashboard project with overview and customer views, an AI-analysis interface, a score-generation pipeline, and an API for customer CSI lookup.',
    notes: [
      ['From overview to detail', 'Aggregate indicators and customer-level views support different investigative questions.'],
      ['Keep calculation explicit', 'A separate scoring pipeline makes the distinction between producing scores and displaying them clear.'],
      ['Analysis in context', 'AI analysis sits alongside operational data rather than replacing the underlying records and filters.'],
    ], stack: ['Python', 'Dash', 'Plotly', 'PostgreSQL', 'Groq'],
  },
  {
    slug: 'churn-prediction', title: 'Look ahead, then check the prediction.', category: 'Intelligence',
    label: 'Customer churn prediction', cover: 'prediction', color: 'lavender',
    summary: 'A customer churn and account-lock prediction pipeline, with dated snapshots, reports, and validation of earlier predictions.',
    scope: 'Applied machine learning',
    context: 'A customer-risk prediction is useful only if its time horizon is clear and its outcome can eventually be checked. Reporting and retrospective validation belong in the same workflow as training.',
    approach: 'The pipeline uses historical customer snapshots, preprocessing, and LightGBM classifiers for 30-day and 60-day churn or account-lock targets. It includes report generation, prior-report validation, and an optional email delivery script.',
    outcome: 'Training, prediction, reporting, and validation scripts. No model-accuracy or business-impact claim is published here without a verified evaluation.',
    notes: [
      ['Predict a defined horizon', 'Thirty-day and sixty-day targets make the timing of a prediction explicit.'],
      ['Respect what can be observed', 'Snapshot dates and label cutoffs matter when deciding whether an outcome is available for training or validation.'],
      ['Close the reporting loop', 'Validation of earlier reports is part of the workflow, so predictions can be compared with subsequent outcomes.'],
    ], stack: ['Python', 'LightGBM', 'scikit-learn', 'SQL', 'Pandas'],
  },
];
