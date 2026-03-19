using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Xml.Serialization;

// Modified from Altinn.Common.EFormidlingClient.Models
namespace Altinn.App.Models.Arkivmelding
{
    /// <summary>
    /// Initializes a new instance of the <see cref="Arkivmelding"/> class. This class represents the actual arkivmelding.
    /// </summary>
    /// This class is based on the XSD definition: https://github.com/difi/felleslosninger/blob/gh-pages/resources/arkivmelding/arkivmelding.xsd
    [XmlRoot(ElementName = "arkivmelding", Namespace = "http://www.arkivverket.no/standarder/noark5/arkivmelding")]
    public class Arkivmelding
    {
        /// <summary>
        ///  Gets or sets the System
        /// </summary>
        [XmlElement(ElementName = "system", Namespace = "http://www.arkivverket.no/standarder/noark5/arkivmelding", Order = 1)]
        [Required]
        public string System { get; set; }

        /// <summary>
        ///  Gets or sets the MeldingId
        /// </summary>
        [XmlElement(ElementName = "meldingId", Namespace = "http://www.arkivverket.no/standarder/noark5/arkivmelding", Order = 2)]
        public string MeldingId { get; set; }

        /// <summary>
        ///  Gets or sets the Tidspunkt
        /// </summary>
        [XmlElement(ElementName = "tidspunkt", Namespace = "http://www.arkivverket.no/standarder/noark5/arkivmelding", Order = 3)]
        public DateTime Tidspunkt { get; set; }

        /// <summary>
        ///  Gets or sets the AntallFiler
        /// </summary>
        [XmlElement(ElementName = "antallFiler", Namespace = "http://www.arkivverket.no/standarder/noark5/arkivmelding", Order = 4)]
        public int AntallFiler { get; set; }

        /// <summary>
        ///  Gets or sets the Mappe
        /// </summary>
        [XmlElement(ElementName = "mappe", Order = 5)]
        public List<Mappe> Mappe { get; set; }

        /// <summary>
        ///  Gets or sets the SchemaLocation
        /// </summary>
        [XmlAttribute(AttributeName = "schemaLocation", Namespace = "http://www.w3.org/2001/XMLSchema-instance")]
        public string SchemaLocation { get; set; }

        /// <summary>
        ///  Gets or sets the Xmlns
        /// </summary>
        [XmlAttribute(AttributeName = "xmlns", Namespace = "http://www.arkivverket.no/standarder/noark5/arkivmelding")]
        public string Xmlns { get; set; }
        /// <summary>
        ///  Gets or sets the Xsi
        /// </summary>
        [XmlAttribute(AttributeName = "xsi", Namespace = "http://www.w3.org/2000/xmlns/")]
        public string Xsi { get; set; }
    }

    /// <summary>
    /// Initializes a new instance of the <see cref="Mappe"/> class.
    /// </summary>
    [XmlTypeAttribute(TypeName = "saksmappe")]
    public class Mappe
    {
        /// <summary>
        ///  Gets or sets the SystemID
        /// </summary>
        [XmlElement(ElementName = "systemID", Namespace = "http://www.arkivverket.no/standarder/noark5/arkivmelding", Order = 1)]
        public Guid SystemID { get; set; }
        //public string SystemID { get; set; }

        /// <summary>
        ///  Gets or sets the Tittel
        /// </summary>
        [XmlElement(ElementName = "tittel", Namespace = "http://www.arkivverket.no/standarder/noark5/arkivmelding", Order = 2)]
        public string Tittel { get; set; }

        /// <summary>
        ///  Gets or sets the OpprettetDato
        /// </summary>
        [XmlElement(ElementName = "opprettetDato", Namespace = "http://www.arkivverket.no/standarder/noark5/arkivmelding", Order = 3)]
        public DateTime OpprettetDato { get; set; }

        /// <summary>
        ///  Gets or sets the OpprettetAv
        /// </summary>
        [XmlElement(ElementName = "opprettetAv", Namespace = "http://www.arkivverket.no/standarder/noark5/arkivmelding", Order = 4)]
        public string OpprettetAv { get; set; }

        /// <summary>
        ///  Gets or sets the Basisregistrering
        /// </summary>
        [XmlElement(ElementName = "basisregistrering", Namespace = "http://www.arkivverket.no/standarder/noark5/arkivmelding", Order = 5)]
        public Basisregistrering Basisregistrering { get; set; }

        /// <summary>
        ///  Gets or sets the Saksdato
        /// </summary>
        [XmlElement(ElementName = "saksdato", DataType = "date", Namespace = "http://www.arkivverket.no/standarder/noark5/arkivmelding", Order = 6)]
        public DateTime Saksdato { get; set; }

        /// <summary>
        ///  Gets or sets the AdministrativEnhet
        /// </summary>
        [XmlElement(ElementName = "administrativEnhet", Namespace = "http://www.arkivverket.no/standarder/noark5/arkivmelding", Order = 7)]
        public string AdministrativEnhet { get; set; }

        /// <summary>
        ///  Gets or sets the Saksansvarlig
        /// </summary>
        [XmlElement(ElementName = "saksansvarlig", Namespace = "http://www.arkivverket.no/standarder/noark5/arkivmelding", Order = 8)]
        public string Saksansvarlig { get; set; }

        /// <summary>
        ///  Gets or sets the Saksstatus
        /// </summary>
        /// <remarks>
        /// The accepted values are: "Under behandling", "Avsluttet" or "Utgår".
        /// </remarks>
        [XmlElement(ElementName = "saksstatus", Namespace = "http://www.arkivverket.no/standarder/noark5/arkivmelding", Order = 9)]
        public string Saksstatus { get; set; }

        /// <summary>
        ///  Gets or sets the Type
        /// </summary>
        [XmlAttribute(AttributeName = "type", Namespace = "http://www.w3.org/2001/XMLSchema-instance")]
        public string Type { get; set; }
    }

    /// <summary>
    /// Initializes a new instance of the <see cref="Basisregistrering"/> class.
    /// </summary>
    [XmlTypeAttribute(TypeName = "journalpost")]
    public class Basisregistrering
    {
        /// <summary>
        ///  Gets or sets the SystemID
        /// </summary>
        [XmlElement(ElementName = "systemID", Order = 1)]
        public Guid SystemID { get; set; }

        /// <summary>
        ///  Gets or sets the OpprettetDato
        /// </summary>
        [XmlElement(ElementName = "opprettetDato", Order = 2)]
        public DateTime OpprettetDato { get; set; }

        /// <summary>
        ///  Gets or sets the OpprettetAv
        /// </summary>
        [XmlElement(ElementName = "opprettetAv", Order = 3)]
        public string OpprettetAv { get; set; }

        /// <summary>
        ///  Gets or sets the ReferanseForelderMappe
        /// </summary>
        /// <remarks>
        /// This value should refer to the <see cref="Mappe.SystemID">SystemID</see> of the parent folder (saksmappe).
        /// </remarks>
        [XmlElement(ElementName = "referanseForelderMappe", Order = 4)]
        public Guid ReferanseForelderMappe { get; set; }

        /// <summary>
        ///  Gets or sets the Dokumentbeskrivelse
        /// </summary>
        [XmlElement(ElementName = "dokumentbeskrivelse", Order = 5)]
        public List<Dokumentbeskrivelse> Dokumentbeskrivelse { get; set; }

        /// <summary>
        ///  Gets or sets the Tittel
        /// </summary>
        [XmlElement(ElementName = "tittel", Order = 6)]
        public string Tittel { get; set; }

        /// <summary>
        ///  Gets or sets the OffentligTittel
        /// </summary>
        [XmlElement(ElementName = "offentligTittel", Order = 7)]
        public string OffentligTittel { get; set; }

        /// <summary>
        ///  Gets or sets the Journalposttype
        /// </summary>/
        /// <remarks>
        /// The accepted values are: "Inngående dokument", "Utgående dokument","Organinternt dokument for oppfølging", "Organinternt dokument uten oppfølging" or "Saksframlegg".
        /// </remarks>
        [XmlElement(ElementName = "journalposttype", Order = 8)]
        public string Journalposttype { get; set; }

        /// <summary>
        ///  Gets or sets the Journalstatus
        /// </summary>
        /// <remarks>
        /// The accepted values are: "Journalført", "Ferdigstilt fra saksbehandler", "Godkjent av leder", "Ekspedert", "Arkivert" or "Utgår".
        /// </remarks>
        [XmlElement(ElementName = "journalstatus", Order = 9)]
        public string Journalstatus { get; set; }

        /// <summary>
        ///  Gets or sets the Journaldato
        /// </summary>
        [XmlElement(ElementName = "journaldato", DataType = "date", Order = 10)]
        public DateTime Journaldato { get; set; }

        /// <summary>
        ///  Gets or sets the Type
        /// </summary>
        [XmlAttribute(AttributeName = "type", Namespace = "http://www.w3.org/2001/XMLSchema-instance")]
        public string Type { get; set; }

        /// <summary>
        ///  Gets or sets the Text
        /// </summary>
        [XmlText]
        public string Text { get; set; }
    }

    /// <summary>
    /// Initializes a new instance of the <see cref="Dokumentbeskrivelse"/> class.
    /// </summary>
    [XmlRoot(ElementName = "dokumentbeskrivelse")]
    public class Dokumentbeskrivelse
    {
        /// <summary>
        ///  Gets or sets the SystemID
        /// </summary>
        [XmlElement(ElementName = "systemID", Order = 1)]
        public Guid SystemID { get; set; }

        /// <summary>
        ///  Gets or sets the Dokumenttype
        /// </summary>
        [XmlElement(ElementName = "dokumenttype", Order = 2)]
        public string Dokumenttype { get; set; }

        /// <summary>
        ///  Gets or sets the Dokumentstatus
        /// </summary>
        /// <remarks>
        /// The accepted values are: "Dokumentet er under redigering" or "Dokumentet er under ferdigstilt".
        /// </remarks>
        [XmlElement(ElementName = "dokumentstatus", Order = 3)]
        public string Dokumentstatus { get; set; }

        /// <summary>
        ///  Gets or sets the Tittel
        /// </summary>
        [XmlElement(ElementName = "tittel", Order = 4)]
        public string Tittel { get; set; }

        /// <summary>
        ///  Gets or sets the OpprettetDato
        /// </summary>
        [XmlElement(ElementName = "opprettetDato", Order = 5)]
        public DateTime OpprettetDato { get; set; }

        /// <summary>
        ///  Gets or sets the OpprettetAv
        /// </summary>
        [XmlElement(ElementName = "opprettetAv", Order = 6)]
        public string OpprettetAv { get; set; }

        /// <summary>
        ///  Gets or sets the TilknyttetRegistreringSom
        /// </summary>
        /// <remarks>
        /// The accepted values are: "Hoveddokument" or "Vedlegg".
        /// </remarks>
        [XmlElement(ElementName = "tilknyttetRegistreringSom", Order = 7)]
        public string TilknyttetRegistreringSom { get; set; }

        /// <summary>
        ///  Gets or sets the Dokumentnummer
        /// </summary>
        [XmlElement(ElementName = "dokumentnummer", Order = 8)]
        public int Dokumentnummer { get; set; }

        /// <summary>
        ///  Gets or sets the TilknyttetDato
        /// </summary>
        [XmlElement(ElementName = "tilknyttetDato", Order = 9)]
        public DateTime TilknyttetDato { get; set; }

        /// <summary>
        ///  Gets or sets the TilknyttetAv
        /// </summary>
        [XmlElement(ElementName = "tilknyttetAv", Order = 10)]
        public string TilknyttetAv { get; set; }

        /// <summary>
        ///  Gets or sets the Dokumentobjekt
        /// </summary>
        [XmlElement(ElementName = "dokumentobjekt", Order = 11)]
        public Dokumentobjekt Dokumentobjekt { get; set; }
    }

    /// <summary>
    /// Initializes a new instance of the <see cref="Dokumentobjekt"/> class.
    /// </summary>
    [XmlRoot(ElementName = "dokumentobjekt")]
    public class Dokumentobjekt
    {
        /// <summary>
        ///  Gets or sets the Versjonsnummer
        /// </summary>
        [XmlElement(ElementName = "versjonsnummer", Order = 1)]
        public int Versjonsnummer { get; set; }

        /// <summary>
        ///  Gets or sets the Variantformat
        /// </summary>
        /// <remarks>
        /// The accepted values are: "Produksjonsformat", "Arkivformat" or "Dokument hvor deler av innholdet er skjermet".
        /// </remarks>
        [XmlElement(ElementName = "variantformat", Order = 2)]
        public string Variantformat { get; set; }

        /// <summary>
        ///  Gets or sets the OpprettetDato
        /// </summary>
        [XmlElement(ElementName = "opprettetDato", Order = 3)]
        public DateTime OpprettetDato { get; set; }

        /// <summary>
        ///  Gets or sets the OpprettetAv
        /// </summary>
        [XmlElement(ElementName = "opprettetAv", Order = 4)]
        public string OpprettetAv { get; set; }

        /// <summary>
        ///  Gets or sets the ReferanseDokumentfil
        /// </summary>
        [XmlElement(ElementName = "referanseDokumentfil", Order = 5)]
        public string ReferanseDokumentfil { get; set; }
    }
}