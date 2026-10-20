// Facts come from the owner's project documents and conversations. No fictional projects,
// dates, client testimonials, performance claims, email addresses, or credentials.
export const site = {
  name: 'Muhammad Usama Aslam', shortName: 'Usama Aslam',
  role: 'AI systems & inference engineer',
  url: 'https://theusamaaslam.github.io',
  description: 'Usama Aslam builds production AI systems, from conversational agents and knowledge retrieval to model inference and the infrastructure underneath.',
  github: 'https://github.com/theusamaaslam',
  linkedin: 'https://www.linkedin.com/in/theusamaaslam/',
};
export type Project = {
  slug: string; title: string; category: 'Agents' | 'Platforms' | 'Intelligence';
  label: string; summary: string; context: string; approach: string;
  outcome: string; notes: [string, string][]; stack: string[];
  scope: string; cover: string; color: string; link?: string; linkLabel?: string;
};
export const projects: Project[] = [
  {
    slug: 'customer-support', title: 'An answer is only the beginning.', category: 'Agents',
    label: 'Nayatel customer support', cover: 'support', color: 'sage',
    summary: 'Customer support over WhatsApp, connected to organizational knowledge, backend operations, and human teams.',
    scope: 'Collaborative engineering · Nayatel',
    context: 'A useful customer-support assistant needs more than a good response. It needs account context, reliable delivery, access to the right backend operations, and a clear path to a human when the conversation needs one.',
    approach: 'My team and I built a WhatsApp support chatbot for Nayatel, connected to an omnichannel support platform. Knowledge retrieval and backend integrations sit alongside department routing, queues, assignment, human handover, and follow-ups.',
    outcome: 'A production customer-support system for Nayatel. A documented stress test covered 5,000 requests, with a highest tested incoming load of 5 requests per second. These are test observations, not a claim of sustained production throughput.',
    notes: [
      ['One conversation, multiple systems', 'The assistant, delivery platform, knowledge base, and backend operations each need explicit failure handling. A generated answer is not proof that a message reached the customer.'],
      ['A useful human handover', 'Department routing and queues connect automated support to the people who can resolve the next part of the request.'],
      ['Evidence before diagnosis', 'Production investigation separated application timeouts and session-lock failures from DNS and network transport errors. Concurrent logs and reproducible checks made that distinction useful.'],
    ], stack: ['Python', 'RAG', 'WhatsApp', 'Backend tools', 'Omnichannel support'],
  },
  {
    slug: 'naya-voice', title: 'Conversation has a runtime.', category: 'Agents',
    label: 'Naya Voice / billing voicebot', cover: 'voice', color: 'dark',
    summary: 'A LiveKit voice-agent system connecting live calls, workflow state, knowledge, and customer operations.',
    scope: 'Voice-agent architecture & reliability · Nayatel',
    context: 'Voice makes system behavior immediate. A slow tool becomes dead air; a lost handoff becomes a repeated question. Cost controls must preserve the caller’s context and the correctness of backend actions.',
    approach: 'The platform combines SIP calling and LiveKit audio with a Python runtime, topic-specific agents, Gemini sessions, MCP tools, and LightRAG. Structured call state helps preserve identity, verification, and known facts as conversations move between workflow steps.',
    outcome: 'The work includes runtime review, cost and context analysis, and an end-to-end failure-benchmark plan. A target of 15 concurrent calls is a benchmark objective, not a published capacity result.',
    notes: [
      ['Context with boundaries', 'Scoped prompts and tools keep each step focused. Session refreshes and summaries manage retained context while the Python runtime carries structured call facts.'],
      ['Writes need stronger guarantees', 'A timeout can leave a backend action in an unknown state. Idempotency, explicit outcomes, and reconciliation matter as much as retries.'],
      ['Measure the whole call', 'Call admission, greeting delay, tool latency, handoff, transfer, recordings, and shutdown all belong in the reliability picture.'],
    ], stack: ['LiveKit', 'Python', 'Gemini', 'MCP', 'LightRAG', 'SIP'],
  },
  {
    slug: 'nayacode', title: 'A coding agent, made into a product.', category: 'Platforms',
    label: 'NayaCode', cover: 'code', color: 'peach',
    summary: 'A branded Windows AI application, with model access, MCP integrations, browser tools, and a real release process.',
    scope: 'Product engineering & desktop delivery · Nayatel',
    context: 'Turning an agent codebase into a usable desktop product means working through the details: provider discovery, credentials, branding, browser behavior, installation paths, updates, and conversation continuity.',
    approach: 'NayaCode work spans Windows packaging, Nayatel LiteLLM integration, guided MCP connections, browser functionality, and GitHub releases. Related work explores new upstream foundations while retaining a consistent product identity.',
    outcome: 'Windows installer releases and a continuing NayaCode V2 effort. The work includes application branding, English-language surfaces, repository cleanup, browser fixes, and fresh-install behavior.',
    notes: [
      ['Integration over decoration', 'Model discovery and MCP connections make the desktop application useful in an existing engineering environment.'],
      ['Continuity after tools', 'An agent needs to carry the original request through tool calls and follow-up responses. Request tracking and context behavior are part of product quality.'],
      ['Shipping is engineering', 'Installer metadata, application data, upgrade compatibility, and release verification all affect the user’s first experience.'],
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
    slug: 'urdu-speech', title: 'Making the voice speak Urdu.', category: 'Intelligence',
    label: 'Urdu speech / NayaTTS', cover: 'speech', color: 'sand',
    summary: 'Connecting Urdu speech synthesis and recognition to conversational agents, with practical attention to audio formats and playback.',
    scope: 'Speech integration & experimentation',
    context: 'A speech model endpoint is only one part of a voice agent. Its response format, sample rate, streaming behavior, pronunciation, and interruption handling all affect the conversation.',
    approach: 'The work includes Ghalib and NayaTTS adapters for LiveKit, Faster-Whisper recognition, and Gemini conversation. A Qwen3-TTS-based Urdu voice is connected through a dedicated adapter rather than assuming every synthesis service shares an API.',
    outcome: 'Working agent scripts and TTS integration checks, including real synthesis delivered as LiveKit audio frames. The work also examines model references and Urdu conversational behavior.',
    notes: [
      ['Honor the audio contract', 'Sample rate, channels, encoding, and service behavior need to match the playback pipeline.'],
      ['Adapters make differences explicit', 'Separate speech services can require different request payloads and synthesis handling even when both return audio.'],
      ['Test what a caller hears', 'Actual generated speech through the runtime is stronger evidence than a healthy HTTP endpoint alone.'],
    ], stack: ['Urdu TTS', 'LiveKit', 'Qwen3-TTS', 'vLLM-Omni', 'Faster-Whisper'],
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
