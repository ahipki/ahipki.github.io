using CreationQuestionnaire.Models;
using System.Collections.ObjectModel;

namespace CreationQuestionnaire.ViewModels
{
    public class QuestionListViewModel
    {
        public ObservableCollection<Question> QuestionList { get; set; }

        public QuestionListViewModel()
        {
            QuestionList =
            [
                // test
                new Question
                {
                    QuestionText = "Cette question est-elle un test back ?",
                    A = "Oui",
                    B = "Non",
                    BonneReponse = "A",
                    Chance = 100,
                    CommentaireText = "ceci est un premier test",
                    Points = 5,
                    Melange = "N"
                },
                new Question
                {
                    QuestionText = "Quelles sont les couleurs du drapeau Français",
                    A = "Rouge",
                    B = "Vert",
                    C = "Bleu",
                    D = "Blanc",
                    E = "Orange",
                    F = "Noir",
                    BonneReponse = "A+C+D",
                    Chance = 10,
                    CommentaireText = "ceci est un deuxieme test",
                    Points = 5,
                    Melange = "O"
                },
                new Question
                {
                    QuestionText = "Qu'est-ce que le bonheur'",
                    Libre = 10,
                    CommentaireText = "ceci est un deuxieme test",
                    Points = 5
                },
            ];
        }
    }
}
