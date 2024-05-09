using CreationQuestionnaire.Models;
using System.IO;
using System.Text;

namespace CreationQuestionnaire.Services;

public class CsvService
{
    public static void ExportToCsv(List<Question> questionList, string filePath)
    {
        if (questionList == null || questionList.Count == 0)
            return;

        StringBuilder csvContent = new StringBuilder();

        // Créez l'en-tête CSV en incluant les noms des champs
        csvContent.AppendLine("Question, Commentaire, A, B, C, D, E, F, Ap, Bp, Cp, Dp, Ep, Fp, BonneReponse, Points, Multi, Melange, Libre, Chance, Categorie, NotePerso");

        foreach (Question question in questionList)
        {
            // Formatez chaque champ de la question
            string questionField = FormatCsvField(question.QuestionText);
            string commentaireField = FormatCsvField(question.CommentaireText);
            string aField = FormatCsvField(question.A);
            string bField = FormatCsvField(question.B);
            string cField = FormatCsvField(question.C);
            string dField = FormatCsvField(question.D);
            string eField = FormatCsvField(question.E);
            string fField = FormatCsvField(question.F);
            string apField = FormatCsvField(question.Ap);
            string bpField = FormatCsvField(question.Bp);
            string cpField = FormatCsvField(question.Cp);
            string dpField = FormatCsvField(question.Dp);
            string epField = FormatCsvField(question.Ep);
            string fpField = FormatCsvField(question.Fp);
            string bonneReponseField = FormatCsvField(question.BonneReponse);
            string pointsField = FormatCsvField(question.Points);
            string multiField = FormatCsvField(question.MultiReponses);
            string melangeField = FormatCsvField(question.Melange);
            string libreField = FormatCsvField(question.Libre);
            string chanceField = FormatCsvField(question.Chance);
            string categorieField = FormatCsvField(question.Categorie);
            string notePersoField = FormatCsvField(question.NotePerso);

            // Ajoutez les champs à la ligne CSV
            csvContent.AppendLine($"{questionField}, {commentaireField}, {aField}, {bField}, {cField}, {dField}, {eField}, {fField}, {apField}, {bpField}, {cpField}, {dpField}, {epField}, {fpField}, {bonneReponseField}, {pointsField}, {multiField}, {melangeField}, {libreField}, {chanceField}, {categorieField}, {notePersoField}");
        }

        File.WriteAllText(filePath, csvContent.ToString());
    }

    // Méthode pour formater une valeur de champ CSV
    private static string FormatCsvField(string field)
    {
        if (string.IsNullOrEmpty(field))
        {
            return field;
        }
        // Si la valeur de champ contient une virgule, des guillemets ou des retours à la ligne,
        // elle doit être entourée de guillemets et les guillemets dans la valeur doivent être échappés
        if (field.Contains(",") || field.Contains("\"") || field.Contains("\n"))
        {
            // Échappez les guillemets en doublant les guillemets existants
            field = field.Replace("\"", "\"\"");

            // Entourez la valeur de champ par des guillemets
            field = $"\"{field}\"";
        }
        return field;
    }
}
