namespace CreationQuestionnaire.Helpers;

public class ValidationQuestionnaire
{
    /// <summary>
    /// Fonction pour vérifier si une chaîne est un nombre valide (int ou double, négatif ou positif)
    /// </summary>
    public static bool IsValidNumber(string input)
    {
        return double.TryParse(input, out _);
    }

    /// <summary>
    /// Fonction pour vérifier les caractères valides pour "BonneReponse" (A B C D E F + /)
    /// </summary>
    public static bool IsValidBonneReponse(string input)
    {
        return "ABCDEF+/".Contains(input);
    }

    /// <summary>
    /// Fonction pour vérifier les caractères valides pour "Multi" et "Melange" (O N ou vide)
    /// </summary>
    public static bool IsValidON(string input)
    {
        return string.IsNullOrEmpty(input) || input == "O" || input == "N";
    }

    /// <summary>
    /// Fonction pour vérifier les caractères valides pour "Libre" (vide, 0, nombre ou "max")
    /// </summary>
    public static bool IsValidLibre(string input)
    {
        return string.IsNullOrEmpty(input) || input == "0" || input.ToLower() == "max" || int.TryParse(input, out _);
    }

    /// <summary>
    /// Fonction pour vérifier les valeurs valides pour "Chance" (vide ou int de 0 à 100)
    /// </summary>
    public static bool IsValidChance(string input)
    {
        if (string.IsNullOrEmpty(input))
            return true;

        if (int.TryParse(input, out int value))
        {
            return value >= 0 && value <= 100;
        }

        return false;
    }
}
