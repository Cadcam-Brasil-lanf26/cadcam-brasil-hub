import logo from "@/assets/logo.png";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="container mx-auto px-6 py-8">
        <img 
          src={logo} 
          alt="CADCAM Brasil - Jornada Programação CNC" 
          className="h-16 md:h-20 object-contain"
        />
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-6 py-12 md:py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="font-inter text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight animate-fade-in">
            Programação CNC
          </h1>
          
          <p className="font-montserrat text-lg md:text-xl text-subtitle max-w-2xl mx-auto leading-relaxed opacity-0 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Transforme seu conhecimento em manufatura de precisão com as técnicas mais avançadas do mercado.
          </p>
        </div>

        {/* Content Section */}
        <section className="mt-16 md:mt-24 max-w-3xl mx-auto">
          <div className="bg-card rounded-lg p-8 md:p-10 border border-border glow-effect opacity-0 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <h2 className="font-inter text-2xl md:text-3xl font-semibold text-primary mb-6">
              O que é CNC?
            </h2>
            <p className="font-montserrat text-foreground leading-relaxed mb-6">
              CNC (Controle Numérico Computadorizado) é a tecnologia que permite controlar máquinas-ferramenta através de comandos programados. Com ela, é possível criar peças com alta precisão e repetibilidade.
            </p>
            <p className="font-montserrat text-muted-foreground leading-relaxed">
              Na programação CNC, você aprende a criar códigos G e M que comandam fresadoras, tornos e centros de usinagem para produzir componentes industriais de qualidade.
            </p>
          </div>
        </section>

        {/* Features */}
        <section className="mt-12 max-w-3xl mx-auto grid md:grid-cols-3 gap-6 opacity-0 animate-fade-in" style={{ animationDelay: "0.6s" }}>
          <div className="bg-secondary rounded-lg p-6 text-center">
            <div className="text-primary text-3xl font-inter font-bold mb-2">G-Code</div>
            <p className="text-muted-foreground text-sm font-montserrat">Linguagem universal de programação</p>
          </div>
          <div className="bg-secondary rounded-lg p-6 text-center">
            <div className="text-primary text-3xl font-inter font-bold mb-2">CAM</div>
            <p className="text-muted-foreground text-sm font-montserrat">Manufatura assistida por computador</p>
          </div>
          <div className="bg-secondary rounded-lg p-6 text-center">
            <div className="text-primary text-3xl font-inter font-bold mb-2">5 Eixos</div>
            <p className="text-muted-foreground text-sm font-montserrat">Usinagem avançada multieixo</p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-8 mt-12 border-t border-border">
        <p className="text-center text-muted-foreground text-sm font-montserrat">
          © 2026 CADCAM Brasil. Todos os direitos reservados.
        </p>
      </footer>
    </div>
  );
};

export default Index;
