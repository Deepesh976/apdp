import { Link } from "react-router-dom";
import { Mail, MapPin, Phone, User, MessageSquareText } from "lucide-react";

export default function Contact() {
  return (
    <div>
      {/* Hero */}
      <section className="relative">
        <div className="relative h-[28vh] w-full overflow-hidden md:h-[36vh]">
          <img
            src="https://images.unsplash.com/photo-1526948128573-703ee1aeb6fa?q=80&w=1600&auto=format&fit=crop"
            alt="Contact Accord Power"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/20" />
          <div className="absolute inset-0">
            <div className="container flex h-full items-end pb-6">
              <div>
                <h1 className="text-3xl font-extrabold uppercase tracking-wide text-white drop-shadow md:text-5xl">
                  Stay Connected
                </h1>
                <nav className="mt-2 text-sm text-white/80">
                  <Link to="/" className="hover:text-white">Home</Link>
                  <span className="mx-2">/</span>
                  <span className="text-white">Contact</span>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="container py-12 md:py-20">
        <div className="grid gap-10 md:grid-cols-2">
          {/* Form */}
          <div className="rounded-lg border border-border bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-bold uppercase tracking-wide text-primary">Send us a message</h2>
            <form onSubmit={(e) => e.preventDefault()} className="grid gap-4">
              <div className="grid gap-2">
                <label htmlFor="name" className="text-xs font-semibold uppercase tracking-wide text-foreground/70">Name</label>
                <div className="relative">
                  <User className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/40" />
                  <input id="name" name="name" required placeholder="Name" className="w-full rounded-md border border-input bg-background py-2 pl-10 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring" />
                </div>
              </div>
              <div className="grid gap-2">
                <label htmlFor="phone" className="text-xs font-semibold uppercase tracking-wide text-foreground/70">Phone No</label>
                <div className="relative">
                  <Phone className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/40" />
                  <input id="phone" name="phone" required placeholder="Phone No" className="w-full rounded-md border border-input bg-background py-2 pl-10 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring" />
                </div>
              </div>
              <div className="grid gap-2">
                <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wide text-foreground/70">Email</label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/40" />
                  <input id="email" name="email" type="email" required placeholder="Email" className="w-full rounded-md border border-input bg-background py-2 pl-10 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring" />
                </div>
              </div>
              <div className="grid gap-2">
                <label htmlFor="message" className="text-xs font-semibold uppercase tracking-wide text-foreground/70">Message</label>
                <div className="relative">
                  <MessageSquareText className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-foreground/40" />
                  <textarea id="message" name="message" required placeholder="Message" rows={5} className="w-full resize-none rounded-md border border-input bg-background py-2 pl-10 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring" />
                </div>
              </div>
              <div className="pt-2">
                <button type="submit" className="inline-flex items-center rounded-md bg-accent px-5 py-2.5 font-semibold uppercase tracking-wide text-white shadow-sm transition-colors hover:bg-accent/90">Send Message</button>
              </div>
            </form>
          </div>

          {/* Info */}
          <div className="grid gap-6">
            <div className="rounded-lg border border-border bg-primary/5 p-6">
              <h3 className="mb-2 text-base font-bold uppercase tracking-wide text-primary">Accord Power Digital Products</h3>
              <div className="mt-3 space-y-3 text-sm text-foreground/80">
                <div className="flex items-start gap-3"><MapPin className="mt-0.5 h-4 w-4 text-accent" /> <div>
                  Plot No. 34/A, Street Number 8<br />
                  Kushaiguda Industrial Area, Electronic Complex<br />
                  Kushaiguda, Hyderabad<br />
                  Telangana - 500 062
                </div></div>
                <div className="flex items-center gap-3"><Phone className="h-4 w-4 text-accent" /> <a href="tel:04027144666" className="hover:text-accent">040-27144666</a></div>
                <div className="flex items-center gap-3"><Mail className="h-4 w-4 text-accent" /> <a href="mailto:online@accordpower.in" className="hover:text-accent">online@accordpower.in</a></div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-border bg-white p-4 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-wide text-foreground/70">Managing Director</p>
                <p className="text-sm font-semibold text-primary">Mr. Venkat Reddy</p>
                <a href="tel:9963800599" className="text-sm text-foreground/80 hover:text-accent">+91 99638 00599</a>
                <div className="text-xs text-foreground/60">venkatreddy@accordpower.in</div>
              </div>
              <div className="rounded-lg border border-border bg-white p-4 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-wide text-foreground/70">Managing Partner</p>
                <p className="text-sm font-semibold text-primary">Mr. Gaurav Saini</p>
                <a href="tel:9963088011" className="text-sm text-foreground/80 hover:text-accent">+91 99630 88011</a>
                <div className="text-xs text-foreground/60">gaurav@accordpower.in</div>
              </div>
            </div>

            <div className="rounded-lg border border-border bg-white p-4 shadow-sm">
              <p className="mb-2 text-xs font-bold uppercase tracking-wide text-foreground/70">Support Team</p>
              <div className="grid gap-3 text-sm text-foreground/80 sm:grid-cols-2">
                <div>
                  <p className="font-semibold text-primary">Marketing</p>
                  <div>Mr. Vamshi</div>
                  <a href="tel:7337363699" className="hover:text-accent">+91 73373 63699</a>
                </div>
                <div>
                  <p className="font-semibold text-primary">Technical</p>
                  <div>Mr. Vinod Kumar</div>
                  <a href="tel:9100906320" className="hover:text-accent">+91 91009 06320</a>
                </div>
                <div>
                  <p className="font-semibold text-primary">Technical</p>
                  <div>Mr. Satti Reddy</div>
                  <a href="tel:9963800466" className="hover:text-accent">+91 99638 00466</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="container pb-14 md:pb-20">
        <div className="overflow-hidden rounded-lg border border-border shadow-sm">
          <iframe
            title="Accord Power Digital Products Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3805.563995686657!2d78.56908481487764!3d17.48057038802282!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9c80b1235693%3A0x4fd5d867de73bcd4!2sAccord+Power+Digital+Products!5e0!3m2!1sen!2s!4v1502946530630"
            width="100%"
            height="460"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </div>
  );
}
