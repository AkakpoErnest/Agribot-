import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github, Linkedin, Mail, Code, Palette } from 'lucide-react';

interface TeamMember {
  name: string;
  role: string;
  roleLocalized: {
    en: string;
    tw: string;
    ee: string;
    ga: string;
  };
  description: string;
  descriptionLocalized: {
    en: string;
    tw: string;
    ee: string;
    ga: string;
  };
  image: string;
  skills: string[];
  social?: {
    github?: string;
    linkedin?: string;
    email?: string;
  };
}

interface TeamSectionProps {
  language: string;
}

export const TeamSection = ({ language }: TeamSectionProps) => {
  const teamMembers: TeamMember[] = [
    {
      name: "Sefakor",
      role: "Lead Developer & AI Engineer",
      roleLocalized: {
        en: "Lead Developer & AI Engineer",
        tw: "Lead Developer & AI Engineer",
        ee: "Lead Developer & AI Engineer",
        ga: "Lead Developer & AI Engineer"
      },
      description: "Full-stack developer specializing in AI integration and agricultural technology solutions. Passionate about creating accessible technology for farmers.",
      descriptionLocalized: {
        en: "Full-stack developer specializing in AI integration and agricultural technology solutions. Passionate about creating accessible technology for farmers.",
        tw: "Full-stack developer a ɔyɛ AI integration ne kuayɛ mfidie nsɛm. Ɔpɛ sɛ ɔyɛ mfidie a ɛyɛ wo akuafo ma.",
        ee: "Full-stack developer si ɖe AI integration kple agblẽnɔnɔ mɔnuwo ŋu. Ƒe dɔwɔwɔ nye nu siwo wɔa dɔ agblẽnɔlawo ma.",
        ga: "Full-stack developer a ɔyɛ AI integration ne kuayɛ mfidie nsɛm. Ɔpɛ sɛ ɔyɛ mfidie a ɛyɛ wo akuafo ma."
      },
      image: "/team/sefa.jpg",
      skills: ["React", "TypeScript", "AI/ML", "Node.js", "Python"],
      social: {
        github: "https://github.com/sefa",
        linkedin: "https://linkedin.com/in/sefa",
        email: "sefa@agribot.com"
      }
    },
    {
      name: "Carlos",
      role: "UI/UX Designer & Frontend Developer",
      roleLocalized: {
        en: "UI/UX Designer & Frontend Developer",
        tw: "UI/UX Designer & Frontend Developer",
        ee: "UI/UX Designer & Frontend Developer",
        ga: "UI/UX Designer & Frontend Developer"
      },
      description: "Creative designer focused on user experience and accessibility. Designs intuitive interfaces that bridge technology and traditional farming practices.",
      descriptionLocalized: {
        en: "Creative designer focused on user experience and accessibility. Designs intuitive interfaces that bridge technology and traditional farming practices.",
        tw: "Creative designer a ɔhwɛ user experience ne accessibility so. Ɔyɛ interface a ɛyɛ wo ma ɛka mfidie ne kuayɛ akwan ho.",
        ee: "Creative designer si ɖe user experience kple accessibility ŋu. Ƒe dɔwɔwɔ nye interface siwo wɔa dɔ mɔnu kple agblẽnɔnɔ ŋu.",
        ga: "Creative designer a ɔhwɛ user experience ne accessibility so. Ɔyɛ interface a ɛyɛ wo ma ɛka mfidie ne kuayɛ akwan ho."
      },
      image: "/team/carlos.jpg",
      skills: ["UI/UX Design", "React", "Tailwind CSS", "Figma", "Accessibility"],
      social: {
        github: "https://github.com/carlos",
        linkedin: "https://linkedin.com/in/carlos",
        email: "carlos@agribot.com"
      }
    }
  ];

  const getLocalizedText = (texts: { en: string; tw: string; ee: string; ga: string }) => {
    return texts[language as keyof typeof texts] || texts.en;
  };

  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {language === 'en' ? 'Meet Our Team' :
             language === 'tw' ? 'Hwɛ Yɛn Fekuo' :
             language === 'ee' ? 'Kpɔ Míawo ƒe Hame' :
             language === 'ga' ? 'Hwɛ Yɛn Fekuo' : 'Meet Our Team'}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {language === 'en' ? 'The passionate developers and designers behind Agribot' :
             language === 'tw' ? 'Developer ne designer a ɛyɛ Agribot no' :
             language === 'ee' ? 'Developer kple designer siwo wɔa dɔ Agribot ŋu' :
             language === 'ga' ? 'Developer ne designer a ɛyɛ Agribot no' : 'The passionate developers and designers behind Agribot'}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {teamMembers.map((member, index) => (
            <Card key={index} className="p-6 hover:shadow-medium transition-all duration-300 border-2">
              <div className="flex flex-col items-center text-center space-y-4">
                {/* Profile Image */}
                <div className="relative">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20 bg-gradient-primary">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback to placeholder if image fails to load
                        const target = e.target as HTMLImageElement;
                        target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 128 128'%3E%3Crect width='128' height='128' fill='%23e5e7eb'/%3E%3Ctext x='64' y='64' text-anchor='middle' dy='.3em' font-family='Arial' font-size='48' fill='%239ca3af'%3E" + member.name.charAt(0) + "%3C/text%3E%3C/svg%3E";
                      }}
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 p-2 bg-primary rounded-full">
                    {member.name === "Sefakor" ? (
                      <Code className="h-4 w-4 text-primary-foreground" />
                    ) : (
                      <Palette className="h-4 w-4 text-primary-foreground" />
                    )}
                  </div>
                </div>

                {/* Member Info */}
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-foreground">{member.name}</h3>
                  <Badge variant="secondary" className="text-sm">
                    {getLocalizedText(member.roleLocalized)}
                  </Badge>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {getLocalizedText(member.descriptionLocalized)}
                  </p>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap justify-center gap-2">
                  {member.skills.map((skill, skillIndex) => (
                    <Badge key={skillIndex} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>

                {/* Social Links */}
                {member.social && (
                  <div className="flex gap-3 pt-2">
                    {member.social.github && (
                      <a
                        href={member.social.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        <Github className="h-4 w-4" />
                      </a>
                    )}
                    {member.social.linkedin && (
                      <a
                        href={member.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        <Linkedin className="h-4 w-4" />
                      </a>
                    )}
                    {member.social.email && (
                      <a
                        href={`mailto:${member.social.email}`}
                        className="p-2 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        <Mail className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Team Mission Statement */}
        <div className="text-center mt-12">
          <Card className="p-6 bg-gradient-primary border-2 max-w-3xl mx-auto">
            <div className="text-primary-foreground">
              <h3 className="text-xl font-bold mb-3">
                {language === 'en' ? 'Our Mission' :
                 language === 'tw' ? 'Yɛn Adwuma' :
                 language === 'ee' ? 'Míawo ƒe Dɔwɔwɔ' :
                 language === 'ga' ? 'Yɛn Adwuma' : 'Our Mission'}
              </h3>
              <p className="text-sm leading-relaxed">
                {language === 'en' ? 'To bridge the gap between technology and traditional farming by creating accessible, multilingual agricultural solutions that empower Ghanaian farmers.' :
                 language === 'tw' ? 'Sɛ yɛka mfidie ne kuayɛ akwan ho na yɛyɛ mfidie a ɛyɛ wo ma ɛboa akuafo wɔ Ghana.' :
                 language === 'ee' ? 'Be nàka mɔnu kple agblẽnɔnɔ ŋu na nàwɔ nu siwo wɔa dɔ agblẽnɔlawo le Ghana.' :
                 language === 'ga' ? 'Sɛ yɛka mfidie ne kuayɛ akwan ho na yɛyɛ mfidie a ɛyɛ wo ma ɛboa akuafo wɔ Ghana.' : 'To bridge the gap between technology and traditional farming'}
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}; 