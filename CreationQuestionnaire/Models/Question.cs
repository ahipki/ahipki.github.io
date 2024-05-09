using System.ComponentModel;

namespace CreationQuestionnaire.Models;

public class Question
{
    /// <summary>
    /// Question, obligatoire
    /// </summary>
    [DisplayName("Question")]
    public string QuestionText { get; set; }

    /// <summary>
    /// Commentaire, facultatif
    /// </summary>
    [DisplayName("Com")]
    public string? CommentaireText { get; set; }

    /// <summary>
    /// Réponses A B C D E F facultatives et leurs points associés facultatifs
    /// </summary>
    public string? A { get; set; }
    public string? B { get; set; }
    public string? C { get; set; }
    public string? D { get; set; }
    public string? E { get; set; }
    public string? F { get; set; }
    public string? Ap { get; set; }
    public string? Bp { get; set; }
    public string? Cp { get; set; }
    public string? Dp { get; set; }
    public string? Ep { get; set; }
    public string? Fp { get; set; }

    /// <summary>
    /// Liste des bonnes réponses (exemples : A, A+B, A/B ou rien)
    /// </summary>
    public string? BonneReponse { get; set; }

    /// <summary>
    /// Nombre de points qu'on peut gagner avec la question
    /// </summary>
    public string? Points { get; set; }

    /// <summary>
    /// Indique si plusieurs réponses sont possibles : 
    /// si O, alors un texte "plusieurs réponses possibles" s'affichera dans le questionnaire
    /// </summary>
    [DisplayName("Multi")]
    public string? MultiReponses { get; set; }

    /// <summary>
    /// Indique si on doit mélanger les réponses lors de la génération d'un questionnaire (si l'option est choisie à la génération)
    /// Si N, alors les réponses devront rester dans le même ordre : A puis B puis C...
    /// </summary>
    [DisplayName("Mélange")]
    public string? Melange { get; set; }

    /// <summary>
    /// Indique la taille de l'encadré pour une réponse libre
    /// Si 0, alors pas d'encadré, ce n'est pas une question libre et donc on regarde la liste des réponses
    /// </summary>
    public string? Libre { get; set; }

    /// <summary>
    /// Indique le pourcentage de chance qu'on veut donner à la question pour apparaitre dans un questionnaire. 
    /// Si pas de valeur, c'est considéré comme 50% de chance
    /// </summary>
    public string? Chance { get; set; }

    /// <summary>
    /// Indique la categorie d'une question (pour potentiellement créer un questionnaire avec des catégories)
    /// </summary>
    [DisplayName("Catégorie")]
    public string? Categorie { get; set; }

    /// <summary>
    /// Permet d'ajouter des notes personnelles sur la question
    /// </summary>
    public string? NotePerso { get; set; }
}