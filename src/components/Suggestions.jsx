import React from 'react';
import PropType from 'prop-types';
import '../styles/Suggestions.css';

const Suggestions = () => {
  const suggestions = {
    items: [
      {
        kind: 'books#volume',
        id: 'yRw7qYBn1D4C',
        etag: 'Xv84wX9VYvI',
        selfLink: 'https://www.googleapis.com/books/v1/volumes/yRw7qYBn1D4C',
        volumeInfo: {
          title:
            'Annual Report on the OECD Guidelines for Multinational Enterprises 2011 A New Agenda for the Future',
          subtitle: 'A New Agenda for the Future',
          authors: ['OECD'],
          publisher: 'OECD Publishing',
          publishedDate: '2012-01-02',
          description:
            'The report provides a first assessment of the outcome of the 2011 Update of the Guidelines adopted at the OECD Ministerial Meeting and a compilation of ideas for future implementation. It also reports the actions taken by the 42 adhering governments from June 2010 to June 2011.',
          industryIdentifiers: [
            {
              type: 'ISBN_13',
              identifier: '9789264119949',
            },
            {
              type: 'ISBN_10',
              identifier: '9264119949',
            },
          ],
          readingModes: {
            text: false,
            image: true,
          },
          pageCount: 348,
          printType: 'BOOK',
          maturityRating: 'NOT_MATURE',
          allowAnonLogging: false,
          contentVersion: '1.6.2.0.preview.1',
          panelizationSummary: {
            containsEpubBubbles: false,
            containsImageBubbles: false,
          },
          imageLinks: {
            smallThumbnail:
              'http://books.google.com/books/content?id=yRw7qYBn1D4C&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
            thumbnail:
              'http://books.google.com/books/content?id=yRw7qYBn1D4C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
          },
          language: 'en',
          previewLink:
            'http://books.google.com/books?id=yRw7qYBn1D4C&pg=PA154&dq=Batm&hl=&as_pt=BOOKS&cd=1&source=gbs_api',
          infoLink:
            'https://play.google.com/store/books/details?id=yRw7qYBn1D4C&source=gbs_api',
          canonicalVolumeLink:
            'https://play.google.com/store/books/details?id=yRw7qYBn1D4C',
        },
        saleInfo: {
          country: 'US',
          saleability: 'FOR_SALE',
          isEbook: true,
          listPrice: {
            amount: 0,
            currencyCode: 'USD',
          },
          retailPrice: {
            amount: 0,
            currencyCode: 'USD',
          },
          buyLink:
            'https://play.google.com/store/books/details?id=yRw7qYBn1D4C&rdid=book-yRw7qYBn1D4C&rdot=1&source=gbs_api',
        },
        accessInfo: {
          country: 'US',
          viewability: 'ALL_PAGES',
          embeddable: true,
          publicDomain: false,
          textToSpeechPermission: 'ALLOWED',
          epub: {
            isAvailable: false,
          },
          pdf: {
            isAvailable: true,
          },
          webReaderLink:
            'http://play.google.com/books/reader?id=yRw7qYBn1D4C&hl=&as_pt=BOOKS&source=gbs_api',
          accessViewStatus: 'SAMPLE',
          quoteSharingAllowed: false,
        },
        searchInfo: {
          textSnippet:
            '... <b>BATM</b> before and during the restructuring? <b>BATM</b> stated in its letter to the UK NCP of 6 September 2010 that: “BAT Malaysia (<b>BATM</b>) held consultations with BATEU throughout the period August 2006 and January 2007, despite the fact that&nbsp;...',
        },
      },
      {
        kind: 'books#volume',
        id: 'WYgd82RugvUC',
        etag: 'Jr3Xqwmv7xU',
        selfLink: 'https://www.googleapis.com/books/v1/volumes/WYgd82RugvUC',
        volumeInfo: {
          title:
            'Annual Report on the OECD Guidelines for Multinational Enterprises 2012 Mediation and Consensus Building',
          subtitle: 'Mediation and Consensus Building',
          authors: ['OECD'],
          publisher: 'OECD Publishing',
          publishedDate: '2012-12-04',
          description:
            'This report describes the actions taken by the 44 adhering governments over the 12 months to June 2012 to implement the Guidelines.',
          industryIdentifiers: [
            {
              type: 'ISBN_13',
              identifier: '9789264087538',
            },
            {
              type: 'ISBN_10',
              identifier: '9264087532',
            },
          ],
          readingModes: {
            text: false,
            image: true,
          },
          pageCount: 238,
          printType: 'BOOK',
          maturityRating: 'NOT_MATURE',
          allowAnonLogging: false,
          contentVersion: '0.5.2.0.preview.1',
          panelizationSummary: {
            containsEpubBubbles: false,
            containsImageBubbles: false,
          },
          imageLinks: {
            smallThumbnail:
              'http://books.google.com/books/content?id=WYgd82RugvUC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
            thumbnail:
              'http://books.google.com/books/content?id=WYgd82RugvUC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
          },
          language: 'en',
          previewLink:
            'http://books.google.com/books?id=WYgd82RugvUC&pg=PA124&dq=Batm&hl=&as_pt=BOOKS&cd=2&source=gbs_api',
          infoLink:
            'https://play.google.com/store/books/details?id=WYgd82RugvUC&source=gbs_api',
          canonicalVolumeLink:
            'https://play.google.com/store/books/details?id=WYgd82RugvUC',
        },
        saleInfo: {
          country: 'US',
          saleability: 'FOR_SALE',
          isEbook: true,
          listPrice: {
            amount: 0,
            currencyCode: 'USD',
          },
          retailPrice: {
            amount: 0,
            currencyCode: 'USD',
          },
          buyLink:
            'https://play.google.com/store/books/details?id=WYgd82RugvUC&rdid=book-WYgd82RugvUC&rdot=1&source=gbs_api',
        },
        accessInfo: {
          country: 'US',
          viewability: 'ALL_PAGES',
          embeddable: true,
          publicDomain: false,
          textToSpeechPermission: 'ALLOWED',
          epub: {
            isAvailable: false,
          },
          pdf: {
            isAvailable: true,
          },
          webReaderLink:
            'http://play.google.com/books/reader?id=WYgd82RugvUC&hl=&as_pt=BOOKS&source=gbs_api',
          accessViewStatus: 'SAMPLE',
          quoteSharingAllowed: false,
        },
        searchInfo: {
          textSnippet:
            '... <b>BATM&#39;s</b> implementation of the recommendation in Paragraph 58 above . &quot; Response from the parties The UK NCP received <b>BATM&#39;s</b> update dated 2 June 2011 , followed by British American Tobacco PLC&#39;s letter also dated 2 June 2011. The UK&nbsp;...',
        },
      },
      {
        kind: 'books#volume',
        id: 'xYBOKsu-JUkC',
        etag: 'ndZSBq6rYm8',
        selfLink: 'https://www.googleapis.com/books/v1/volumes/xYBOKsu-JUkC',
        volumeInfo: {
          title:
            'Aircraft Accident Notification Procedures and Bureau Responsibilities',
          authors: ['United States. Federal Aviation Agency'],
          publishedDate: '1959',
          industryIdentifiers: [
            {
              type: 'OTHER',
              identifier: 'OSU:32435051124097',
            },
          ],
          readingModes: {
            text: false,
            image: true,
          },
          pageCount: 168,
          printType: 'BOOK',
          categories: ['Aircraft accidents'],
          maturityRating: 'NOT_MATURE',
          allowAnonLogging: false,
          contentVersion: '0.4.5.0.full.1',
          panelizationSummary: {
            containsEpubBubbles: false,
            containsImageBubbles: false,
          },
          imageLinks: {
            smallThumbnail:
              'http://books.google.com/books/content?id=xYBOKsu-JUkC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
            thumbnail:
              'http://books.google.com/books/content?id=xYBOKsu-JUkC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
          },
          language: 'en',
          previewLink:
            'http://books.google.com/books?id=xYBOKsu-JUkC&pg=PA13&dq=Batm&hl=&as_pt=BOOKS&cd=3&source=gbs_api',
          infoLink:
            'https://play.google.com/store/books/details?id=xYBOKsu-JUkC&source=gbs_api',
          canonicalVolumeLink:
            'https://play.google.com/store/books/details?id=xYBOKsu-JUkC',
        },
        saleInfo: {
          country: 'US',
          saleability: 'FREE',
          isEbook: true,
          buyLink:
            'https://play.google.com/store/books/details?id=xYBOKsu-JUkC&rdid=book-xYBOKsu-JUkC&rdot=1&source=gbs_api',
        },
        accessInfo: {
          country: 'US',
          viewability: 'ALL_PAGES',
          embeddable: true,
          publicDomain: true,
          textToSpeechPermission: 'ALLOWED',
          epub: {
            isAvailable: false,
            downloadLink:
              'http://books.google.com/books/download/Aircraft_Accident_Notification_Procedure.epub?id=xYBOKsu-JUkC&hl=&output=epub&source=gbs_api',
          },
          pdf: {
            isAvailable: false,
          },
          webReaderLink:
            'http://play.google.com/books/reader?id=xYBOKsu-JUkC&hl=&as_pt=BOOKS&source=gbs_api',
          accessViewStatus: 'FULL_PUBLIC_DOMAIN',
          quoteSharingAllowed: false,
        },
        searchInfo: {
          textSnippet:
            '... <b>BATM</b> Acci- dent Representative 422.1 The Regional <b>BATM</b> Accident Repre- sentative shall be responsible for : 423 a . Reviewing the operational perform- ance of <b>BATM</b> facilities and per- sonnel involved and determining to his satisfaction&nbsp;...',
        },
      },
      {
        kind: 'books#volume',
        id: 'ReP-DwAAQBAJ',
        etag: 'rFR+Ie4/+Ms',
        selfLink: 'https://www.googleapis.com/books/v1/volumes/ReP-DwAAQBAJ',
        volumeInfo: {
          title:
            'Video Error Concealment Techniques for Multi-Broadcast Reception of Digital TV',
          authors: ['Tobias Tröger'],
          publisher: 'Cuvillier Verlag',
          publishedDate: '2012-10-02',
          description:
            'Abstract The transmission of digital TV signals to mobile receivers is often error-prone. As most TV broadcasting techniques provide only moderate error robustness, horizontal lines of consecutive image blocks are lost during decoding of the received video signals. In order to ensure high viewing experiences, these lost slices have to be filled by error concealment techniques. However, the reconstruction qualities of classical approaches which exploit spatial, temporal, or spatio-temporal signal correlations are not convincing yet. In the future, mobile TV receivers will support different broadcasting techniques in parallel. As a result, an erroneous high-resolution video signal and a correctly received low-resolution video signal, both representing the same TV service, will often be available. Focusing on the outlined scenario for multi-broadcast reception of digital TV signals, this thesis introduces the novel category of inter-sequence error concealment algorithms. The basic idea is to fill lost slices of the high-resolution video signal by the interpolated low-resolution video signal. Since the images of this reference signal are often cropped and delayed, robust spatio-temporal image alignment is crucial. By including a pixel-based or a feature-based alignment scheme, the proposed concealment algorithms provide excellent visual qualities and outstanding reconstruction qualities of up to 41 dB PSNR. Classical concealment techniques are outperformed by up to 15 dB PSNR. To further enhance the reconstruction quality, several extensions are introduced. First, the alignment robustness and the interpolation quality are increased. Subsequently, a classical temporal approach is incorporated as an alternative concealment mode to cope with low image qualities of the reference signal. Novel aspects include robust mode selection, enhanced motion estimation, and the reconstruction of the displaced frame differences from the reference signal. As a last extension, spatial refinement tackles blurring of concealed image blocks. Missing spectral components are recovered in a frequency selective way based on approximation and extrapolation principles. By combining all relevant extensions, the PSNR gain adds up to 20 dB with respect to classical concealment. Finally, inter-sequence error concealment is adapted to multi-broadcast reception of two erroneous high-resolution video signals. While spatial alignment can be omitted, classical concealment of blocks, being lost in both video signals, and drift compensation in predictively-coded frames are novel aspects. Again, high visual qualities are obtained and classical concealment is outperformed by up to 15 dB PSNR. Zusammenfassung Der Empfang digitaler Fernsehsignale mit mobilen Endgeräten wird meist durch Übertragungsfehler gestört. Da viele der eingesetzten Übertragungsstandards nur unzureichende Korrekturmechanismen bieten, können bei der Decodierung der empfangenen Videosignale Blockzeilenverluste auftreten. Um die Verlustgebiete zu verschleiern, werden üblicherweise zeitliche, örtliche oder zeitlich-örtliche Signalkorrelationen ausgenutzt. Die dabei erzielte Rekonstruktionsqualität ist jedoch häufig nicht zufriedenstellend. Zukünftig werden mobile Fernsehempfänger mehrere Übertragungsstandards parallel unterstützen. Durch den Einsatz dieser Mehrfachempfänger ist jedes Fernsehprogramm typischerweise in Form eines gestörten, hochauflösenden Videosignals und eines ungestörten, niedrigauflösenden Videosignals verfügbar. Ausgehend vom Mehrfachempfang digitaler Fernsehsignale wird in dieser Arbeit eine neue Gruppe von Verfahren zur Fehlerverschleierung beschrieben. Die grundlegende Idee dieser Ansätze besteht darin, verlorene Bildblöcke des hochauflösenden Videosignals durch Blöcke des interpolierten niedrigauflösenden Referenzsignals zu ersetzen. Da das Referenzsignal häufig nur Bildausschnitte zeigt und zudem meist zeitverzögert eintrifft, ist die korrekte Bestimmung der örtlichen Abbildungsparameter und des zeitlichen Versatzes ausschlaggebend für eine hochqualitative Verschleierung. Durch den Einsatz bildbasierter oder merkmalsbasierter Schätzverfahren werden eine exzellente visuelle Bildqualität und eine außergewöhnlich hohe Rekonstruktionsqualität erzielt. Der Spitzensignal-Rauschabstand beträgt bis zu 41 dB. Herkömmliche Verfahren werden um bis 15 dB übertroffen. Um die Rekonstruktionsqualität weiter zu erhöhen werden zahlreiche Erweiterungen der beschriebenen Verschleierungsansätze vorgeschlagen. Zuerst werden die Zuverlässigkeit der Parameterschätzung und die Interpolationsqualität verbessert. Danach wird ein herkömmliches zeitliches Verschleierungsverfahren integriert, um eine niedrige Bildqualität des Referenzsignals zu kompensieren. Neue Aspekte sind dabei die robuste Wahl des besseren Verschleierungsmodus, eine verbesserte Bewegungsschätzung und die Rekonstruktion des Prädiktionsfehlers unter Verwendung des Referenzsignals. Zuletzt wird die Bildschärfe bereits verschleierter Blöcke erhöht. Dazu werden fehlende Spektralanteile basierend auf frequenzselektiven Approximations- oder Extrapolationsansätzen wiederhergestellt. Durch die Kombination aller relevanten Erweiterungen wird die Rekonstruktionsqualität herkömmlicher Verfahren um bis zu 20 dB übertroffen. Abschließend werden die beschriebenen Fehlerverschleierungsverfahren an ein Szenario für den Mehrfachempfang digitaler Fernsehsignale angepasst, bei dem zwei fehlerhafte hochauflösende Videosignale verfügbar sind. Während die Schätzung der örtlichen Abbildungsparameter entfällt, müssen Bildblöcke, die in keinem der beiden Videosignale korrekt empfangen wurden, durch herkömmliche Verfahren verschleiert werden. Als weitere Neuerung wird ein Verfahren zur Kompensation des Drifteffekts in prädiktiv codierten Bildern vorgeschlagen. Auch bei diesem Empfangsszenario wird eine hohe visuelle Bildqualität erzielt und die Rekonstruktionsqualität herkömmlicher Verfahren um bis zu 15 dB übertroffen.',
          industryIdentifiers: [
            {
              type: 'ISBN_13',
              identifier: '9783736942332',
            },
            {
              type: 'ISBN_10',
              identifier: '3736942338',
            },
          ],
          readingModes: {
            text: false,
            image: true,
          },
          pageCount: 218,
          printType: 'BOOK',
          categories: ['Technology & Engineering'],
          maturityRating: 'NOT_MATURE',
          allowAnonLogging: false,
          contentVersion: '0.3.1.0.preview.1',
          panelizationSummary: {
            containsEpubBubbles: false,
            containsImageBubbles: false,
          },
          imageLinks: {
            smallThumbnail:
              'http://books.google.com/books/content?id=ReP-DwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
            thumbnail:
              'http://books.google.com/books/content?id=ReP-DwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
          },
          language: 'en',
          previewLink:
            'http://books.google.com/books?id=ReP-DwAAQBAJ&pg=PA125&dq=Batm&hl=&as_pt=BOOKS&cd=4&source=gbs_api',
          infoLink:
            'https://play.google.com/store/books/details?id=ReP-DwAAQBAJ&source=gbs_api',
          canonicalVolumeLink:
            'https://play.google.com/store/books/details?id=ReP-DwAAQBAJ',
        },
        saleInfo: {
          country: 'US',
          saleability: 'FOR_SALE',
          isEbook: true,
          listPrice: {
            amount: 26.93,
            currencyCode: 'USD',
          },
          retailPrice: {
            amount: 26.93,
            currencyCode: 'USD',
          },
          buyLink:
            'https://play.google.com/store/books/details?id=ReP-DwAAQBAJ&rdid=book-ReP-DwAAQBAJ&rdot=1&source=gbs_api',
          offers: [
            {
              finskyOfferType: 1,
              listPrice: {
                amountInMicros: 26930000,
                currencyCode: 'USD',
              },
              retailPrice: {
                amountInMicros: 26930000,
                currencyCode: 'USD',
              },
              giftable: true,
            },
          ],
        },
        accessInfo: {
          country: 'US',
          viewability: 'PARTIAL',
          embeddable: true,
          publicDomain: false,
          textToSpeechPermission: 'ALLOWED',
          epub: {
            isAvailable: false,
          },
          pdf: {
            isAvailable: true,
            acsTokenLink:
              'http://books.google.com/books/download/Video_Error_Concealment_Techniques_for_M-sample-pdf.acsm?id=ReP-DwAAQBAJ&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api',
          },
          webReaderLink:
            'http://play.google.com/books/reader?id=ReP-DwAAQBAJ&hl=&as_pt=BOOKS&source=gbs_api',
          accessViewStatus: 'SAMPLE',
          quoteSharingAllowed: false,
        },
        searchInfo: {
          textSnippet:
            '... <b>BATM</b> -<b>BATM</b> -ISEC -ISEC -OS +1.2 +0.3 +0.3 ISEC still reach up to +1.1 dB (discovery) and +0.9 dB (rugby), respectively. At low bit rates, the gains may be reduced to +0.2 dB as <b>BATM</b> often does not increase the accuracy of the motion&nbsp;...',
        },
      },
      {
        kind: 'books#volume',
        id: 'BuEMeSR66DsC',
        etag: 'PruetsVahLI',
        selfLink: 'https://www.googleapis.com/books/v1/volumes/BuEMeSR66DsC',
        volumeInfo: {
          title: 'A Bridge of Ships',
          subtitle: 'Canadian Shipbuilding during the Second World War',
          authors: ['James Pritchard'],
          publisher: "McGill-Queen's Press - MQUP",
          publishedDate: '2011-05-20',
          description:
            "In A Bridge of Ships James Pritchard tells the story of the rapidly changing circumstances and forceful personalities that shaped government shipbuilding policy. He examines the ownership and expansion of the shipyards and the role of ship repairing, as well as recruitment and training of the labour force. He also tells the story of the struggle for steel and the expansion of ancillary industries. Pritchard provides a definitive picture of Canada's wartime ship production, assesses the cost (more than $1.2 billion), and explains why such an enormous effort left such a short-lived legacy. The story of Canada's shipbuilding industry is as astonishing as that of the nation's wartime navy. The personnel of both expanded more than fifty times, yet the history of wartime shipbuilding remains virtually unknown. With the disappearance of the Canadian shipbuilding industry from both the land and memory, it is time to recall and assess its contribution to Allied victory.",
          industryIdentifiers: [
            {
              type: 'ISBN_13',
              identifier: '9780773585614',
            },
            {
              type: 'ISBN_10',
              identifier: '0773585613',
            },
          ],
          readingModes: {
            text: false,
            image: true,
          },
          pageCount: 440,
          printType: 'BOOK',
          categories: ['History'],
          maturityRating: 'NOT_MATURE',
          allowAnonLogging: false,
          contentVersion: '1.1.1.0.preview.1',
          panelizationSummary: {
            containsEpubBubbles: false,
            containsImageBubbles: false,
          },
          imageLinks: {
            smallThumbnail:
              'http://books.google.com/books/content?id=BuEMeSR66DsC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
            thumbnail:
              'http://books.google.com/books/content?id=BuEMeSR66DsC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
          },
          language: 'en',
          previewLink:
            'http://books.google.com/books?id=BuEMeSR66DsC&pg=PA298&dq=Batm&hl=&as_pt=BOOKS&cd=5&source=gbs_api',
          infoLink:
            'https://play.google.com/store/books/details?id=BuEMeSR66DsC&source=gbs_api',
          canonicalVolumeLink:
            'https://play.google.com/store/books/details?id=BuEMeSR66DsC',
        },
        saleInfo: {
          country: 'US',
          saleability: 'FOR_SALE_AND_RENTAL',
          isEbook: true,
          listPrice: {
            amount: 70,
            currencyCode: 'USD',
          },
          retailPrice: {
            amount: 56,
            currencyCode: 'USD',
          },
          buyLink:
            'https://play.google.com/store/books/details?id=BuEMeSR66DsC&rdid=book-BuEMeSR66DsC&rdot=1&source=gbs_api',
          offers: [
            {
              finskyOfferType: 1,
              listPrice: {
                amountInMicros: 70000000,
                currencyCode: 'USD',
              },
              retailPrice: {
                amountInMicros: 56000000,
                currencyCode: 'USD',
              },
              giftable: true,
            },
            {
              finskyOfferType: 3,
              listPrice: {
                amountInMicros: 56000000,
                currencyCode: 'USD',
              },
              retailPrice: {
                amountInMicros: 50400000,
                currencyCode: 'USD',
              },
              rentalDuration: {
                unit: 'DAY',
                count: 180,
              },
            },
          ],
        },
        accessInfo: {
          country: 'US',
          viewability: 'PARTIAL',
          embeddable: true,
          publicDomain: false,
          textToSpeechPermission: 'ALLOWED',
          epub: {
            isAvailable: false,
          },
          pdf: {
            isAvailable: true,
            acsTokenLink:
              'http://books.google.com/books/download/A_Bridge_of_Ships-sample-pdf.acsm?id=BuEMeSR66DsC&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api',
          },
          webReaderLink:
            'http://play.google.com/books/reader?id=BuEMeSR66DsC&hl=&as_pt=BOOKS&source=gbs_api',
          accessViewStatus: 'SAMPLE',
          quoteSharingAllowed: false,
        },
        searchInfo: {
          textSnippet:
            '... <b>BATM</b> ordered twelve larger 126-foot, wooden minesweepers on 18 December 1942 and twelve more two months later. Three were cancelled, and twenty-one were delivered between May 1944 and June 1945.14 Early in 1944 the <b>BATM</b> ordered&nbsp;...',
        },
      },
    ],
  };
  return (
    <ul className='suggestions-container'>
      {suggestions.map((suggestion, index) => (
        <li key={index} className='suggestion-item'>
          <div className='suggestion-art'>{suggestion.icon}</div>
          <div className='suggestion-text'>
            <span>{suggestion.title}</span>
            <span>{suggestion.author}</span>
          </div>
        </li>
      ))}
    </ul>
  );
};

Suggestions.propTypes = {
  suggestions: PropType.array.isRequired,
};

export default Suggestions;
