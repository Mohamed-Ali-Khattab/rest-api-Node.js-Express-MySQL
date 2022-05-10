import org.xml.sax.Attributes;
import org.xml.sax.SAXException;
import org.xml.sax.helpers.DefaultHandler;
import javax.xml.parsers.SAXParser;
import javax.xml.parsers.SAXParserFactory;
import java.io.File;

public class MonHandler extends DefaultHandler {
    private boolean inLivre = false;
    private String currentElement = "";
    private String titre = "";
    private String auteur = "";

    @Override
    public void startElement(String uri, String localName, String qName, Attributes attributes) throws SAXException {
        currentElement = qName;
        if ("livre".equals(qName)) {
            inLivre = true;
        }
    }

    @Override
    public void endElement(String uri, String localName, String qName) throws SAXException {
        if ("livre".equals(qName)) {
            inLivre = false;
            System.out.println("Titre : " + titre + ", Auteur : " + auteur);
            titre = "";
            auteur = "";
        }
    }

    @Override
    public void characters(char[] ch, int start, int length) throws SAXException {
        if (inLivre) {
            String content = new String(ch, start, length).trim();
            if ("titre".equals(currentElement)) {
                titre = content;
            } else if ("auteur".equals(currentElement)) {
                auteur = content;
            }
        }
    }

    public static void main(String[] args) {
        try {
            // Création du parser SAX
            SAXParserFactory factory = SAXParserFactory.newInstance();
            SAXParser parser = factory.newSAXParser();

            // Utilisation du handler personnalisé
            MonHandler handler = new MonHandler();

            // Parsing du fichier XML
            File xmlFile = new File("exemple.xml");
            parser.parse(xmlFile, handler);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
