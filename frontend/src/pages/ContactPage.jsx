const ContactPage = () => (
  <div className="max-w-4xl mx-auto px-6 py-16 space-y-8">
    <div>
      <p className="text-xs uppercase tracking-[0.4em] text-leaf">Contact</p>
      <h1 className="text-3xl font-semibold">Talk with a nature mentor</h1>
      <p className="text-white/70">We prioritize sustainability queries, partnerships, and educator requests.</p>
    </div>
    <div className="rounded-3xl bg-white/5 border border-white/10 p-8 space-y-4">
      <input className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-2xl" placeholder="Your Name" />
      <input className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-2xl" placeholder="Email" />
      <textarea className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-2xl min-h-[120px]" placeholder="Message" />
      <button className="px-6 py-3 bg-gradient-to-r from-leaf to-sky-500 rounded-full text-sm font-semibold">
        Send message
      </button>
    </div>
  </div>
);

export default ContactPage;
