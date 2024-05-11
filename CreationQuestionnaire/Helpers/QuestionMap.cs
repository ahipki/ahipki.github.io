using CreationQuestionnaire.Models;
using CsvHelper.Configuration;

namespace CreationQuestionnaire.Helpers;

public class QuestionMap : ClassMap<Question>
{
    public QuestionMap()
    {
        CsvConfiguration configuration = new CsvConfiguration(System.Globalization.CultureInfo.InvariantCulture);

        AutoMap(configuration);

        // Spécifiez le nom de la colonne qui a un nom différent
        Map(m => m.CommentaireText).Name("Commentaire");
        Map(m => m.QuestionText).Name("Question");
        Map(m => m.MultiReponses).Name("Multi");
    }
}
